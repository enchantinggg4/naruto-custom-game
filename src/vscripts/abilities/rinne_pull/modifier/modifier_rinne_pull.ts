class modifier_rinne_pull extends CDOTA_Modifier_Lua {

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

            const pullSpeed = this.GetAbility().GetSpecialValueFor("pull_speed");

            const distanceMultiplier = (1 - distance / this.maxDistance) * 2;

            if (distance < 128) {
                this.Destroy();
                return;
            }
            const pullVector = (((vTarget - this.GetParent().GetAbsOrigin()) as Vector).Normalized() * pullSpeed * this.thinkInterval * distanceMultiplier) as Vector;
            this.distanceTravelled += pullVector.Length();

            this.GetParent().SetOrigin(this.GetParent().GetAbsOrigin() + pullVector as Vector)
        }
    }

    OnCreated(params: table): void {
        if (IsServer()) {
            this.thinkInterval = 0.01;
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