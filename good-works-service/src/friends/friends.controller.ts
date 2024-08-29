import { Controller, Get, Param } from '@nestjs/common';
import { Friends } from 'src/entities/friends.entity';
import { FriendInfo, FriendsService } from './friends.service';
import { Crud, CrudController } from '@dataui/crud';

@Crud({ model: { type: Friends } })
@Controller('friends')
export class FriendsController implements CrudController<Friends> {
    constructor(public service: FriendsService) {}
    @Get(':userId/current')
    getFriends(@Param('userId') userId: number): Promise<FriendInfo[]> {
        return this.service.getFriends(userId);
    }
    @Get(':userId/users-status')
    getAllUsersStatus(@Param('userId') userId: number) {
        return this.service.getAllUsersWithFriendStatus(userId);
    }
}
