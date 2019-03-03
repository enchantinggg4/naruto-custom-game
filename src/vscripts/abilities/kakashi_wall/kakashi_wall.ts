declare function QAngle(a: number, b: number, c: number): any;

LinkLuaModifier("modifier_kakashi_wall_thinker", "abilities/kakashi_wall/modifier/modifier_kakashi_wall_thinker.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

class kakashi_wall extends CDOTA_Ability_Lua {

    blocks: any[];

    GetBehavior(): DOTA_ABILITY_BEHAVIOR {
        return DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT
    }

    GetCooldown(iLevel: number): number {
        return this.GetSpecialValueFor("cooldown")
    }

    GetManaCost(iLevel: number): number {
        return this.GetSpecialValueFor("manacost")
    }


    OnChannelFinish(bInterrupted: boolean): void {

    }

    RemoveBlocks() {
        if (this.blocks) {
            this.blocks.forEach(block => {
                UTIL_Remove(block);
            });
        }
        this.blocks = [];
    }

    OnSpellStart(): void {

        const width = this.GetSpecialValueFor("wall_width");
        const duration = this.GetSpecialValueFor("wall_duration");
        const stunDuration = this.GetSpecialValueFor("stun_duration");
        const damage = this.GetSpecialValueFor("damage");

        const part = "particles/units/heroes/hero_earthshaker/earthshaker_fissure.vpcf";
        const vTarget = this.GetCursorPosition();

        this.RemoveBlocks();


        const direction = ((vTarget - this.GetCaster().GetAbsOrigin()) as Vector).Normalized();

        const rotation_point = (vTarget + direction * width / 2) as Vector;
        const end_point_left = RotatePosition(vTarget, QAngle(0, 90, 0), rotation_point);
        const end_point_right = RotatePosition(vTarget, QAngle(0, -90, 0), rotation_point);

        const particle = ParticleManager.CreateParticle(
            part,
            ParticleAttachment_t.PATTACH_ABSORIGIN,
            this.GetCaster()
        );
        ParticleManager.SetParticleControl(particle, 0, end_point_left);
        ParticleManager.SetParticleControl(particle, 1, end_point_right);
        ParticleManager.SetParticleControl(particle, 2, Vector(duration, 0, 0));

        const wallDirection = (end_point_right - end_point_left as Vector).Normalized();

        const blockWidth = 50;

        const blockCount = width / blockWidth;

        for (let i = 0; i < blockCount * 2; i++) {

            const blockPos = end_point_left + wallDirection * (i * blockWidth / 2) as Vector;

            const blocker = CreateModifierThinker(
                this.GetCaster(),
                this,
                "modifier_kakashi_wall_thinker",
                {duration: duration},
                blockPos,
                this.GetCaster().GetTeam(),
                true
            );
            (blocker as any).SetHullRadius(blockWidth);
            this.blocks[i] = blocker;
        }

        Timers.CreateTimer(duration, () => {
            this.RemoveBlocks();
        });

        FindUnitsInLine(
            this.GetCaster().GetTeam(),
            end_point_left,
            end_point_right,
            null,
            blockWidth,
            DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY,
            DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_ALL,
            DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE
        ).forEach(it => {
            it.AddNewModifier(this.GetCaster(), this, "modifier_stunned", {duration: stunDuration});
            ApplyDamage({
                victim: it,
                damage_type: DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL,
                damage: damage,
                attacker: this.GetCaster(),
                ability: this
            });
        })

    }
}
        