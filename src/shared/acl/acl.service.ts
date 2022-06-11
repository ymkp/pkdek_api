import { AclRule, RuleCallback } from './acl-rule.constant';
import { Action } from './action.constant';
import { Actor } from './actor.constant';
import { Resource } from './resource.constant';

export class BaseAclService {
  /**
   * ACL rules
   */
  protected aclRules: AclRule[] = [];

  /**
   * Set ACL rule for a role
   */
  protected canDo(
    actions: Action[],
    ruleCallback?: RuleCallback,
  ): void {
    ruleCallback
      ? this.aclRules.push({  actions, ruleCallback })
      : this.aclRules.push({  actions });
  }

  /**
   * create user specific acl object to check ability to perform any action
   */
  public forActor = (actor: Actor): any => {
    return {
      canDoAction: (action: Action, resource?: Resource) => {
        let canDoAction = false;

     

        return canDoAction;
      },
    };
  };
}
