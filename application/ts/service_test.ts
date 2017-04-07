import { AncView, s } from '../../core/tinyts';
import { UserService } from '../service/user';

export class ServiceTestModel extends AncView {

    @s(UserService)
    userService: UserService;

    AfterInject() {
        console.log(this.userService.GetUserInfo());
    }
}

var aa = new ServiceTestModel();