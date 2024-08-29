import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friends } from 'src/entities/friends.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Users } from 'src/entities/users.entity';
export interface FriendInfo {
    id: number;
    username: string;
}
export interface FriendStatus {
    id: number;
    username: string;
    userid: number;
    isfriend: boolean;
}

@Injectable()
export class FriendsService extends TypeOrmCrudService<Friends> {
    constructor(
        @InjectRepository(Friends) private friendsRepository: Repository<Friends>,
        @InjectRepository(Users) private usersRepository: Repository<Users>
    ) {
        super(friendsRepository);
    }
    
    async getFriends(userId: number): Promise<FriendInfo[]> {
        const friendships = await this.friendsRepository.find({
            where: { user: { id: userId } },
            relations: ['friend'],
        });
        console.log(friendships)
        return friendships.map(f => ({
            id: f.friend.id,
            username: f.friend.username
        }));
    }

    async getUsersWithFriendStatus(userId: number): Promise<FriendStatus[]> {
        const users = await this.friendsRepository.find();
        const friendships = await this.friendsRepository.find({
            where: [{ user: { id: userId } }, { friend: { id: userId } }],
        });

        const friendIds = friendships.map(f => f.friend.id);
        return users.map(user => ({
            id: user.id,
            username: user.friend.username,
            userid: user.friend.id,
            isfriend: !friendIds.includes(user.id)
        }));
    }
    async getAllUsersWithFriendStatus(userId: number): Promise<FriendStatus[]> {
        // Получаем всех пользователей
        const users = await this.usersRepository.find();
    
        // Получаем все дружеские связи для данного пользователя
        const friendships = await this.friendsRepository.find({
            where: [{ user: { id: Number(userId) } }, { friend: { id: Number(userId) } }],
            relations: ['friend'],
        });
    
        // Создаем объект для быстрого поиска идентификаторов дружбы
        const friendMap = new Map<number, { id: number; friendId: number }>();
        friendships.forEach(f => {
            if (f.user.id === Number(userId)) {
                friendMap.set(f.friend.id, { id: f.id, friendId: f.friend.id });
            } else {
                friendMap.set(f.user.id, { id: f.id, friendId: f.user.id });
            }
        });
    
        // Формируем список пользователей с их статусом дружбы и идентификатором дружбы
        return users
            .filter(user => user.id !== Number(userId)) // Пропускаем пользователя с id, равным userId
            .map(user => ({
                id: user.id,
                username: user.username,
                userid: user.id,
                friendId: friendMap.has(user.id) ? friendMap.get(user.id)?.id : null, // Идентификатор дружбы
                isfriend: friendMap.has(user.id), // Указываем, является ли данный юзер другом
            }));
    }
    
    
    
    
}
