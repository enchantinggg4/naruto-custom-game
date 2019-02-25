class modifier_rinne_push extends CDOTA_Modifier_Lua {

    distanceTravelled: number;
    maxDistance: number;

    thinkInterval: number;


    IsDebuff(): boolean {
        return true
    }

    IsStunDebuff(): boolean {
        return true
    }

    OnIntervalThink(): void {
        if (IsServer()) {

            const vTarget = this.GetCaster().GetAbsOrigin();

            const distance = ((vTarget - this.GetParent().GetAbsOrigin()) as Vector).Length();

            const pullSpeed = this.GetAbility().GetSpecialValueFor("push_speed");

            if (distance > this.maxDistance) {
                this.Destroy();
                return;
            }


            const distanceMultiplier = (1 - distance / this.maxDistance) * 2;

            const pushVector = (((this.GetParent().GetAbsOrigin() - vTarget) as Vector).Normalized() * pullSpeed * distanceMultiplier * this.thinkInterval) as Vector;
            this.distanceTravelled += pushVector.Length();

            this.GetParent().SetOrigin(this.GetParent().GetAbsOrigin() + pushVector as Vector)
        }
    }

    OnCreated(params: table): void {
        this.thinkInterval = 0.01;
        if (IsServer()) {
            this.StartIntervalThink(this.thinkInterval);
            this.distanceTravelled = 0;
            this.maxDistance = params.maxDistance;
        }
    }

    OnDestroy(): void {
        if(IsServer()){
            ApplyDamage({
                victim: this.GetParent(),
                attacker: this.GetCaster(),
                damage: this.distanceTravelled * this.GetAbility().GetSpecialValueFor("damage_per_distance"),
                damage_type: DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL,
            })
        }
    }

}