// LinkLuaModifier("modifier_creep_home", "abilities/modifier/modifier_creep_home.lua", LuaModifierType.LUA_MODIFIER_MOTION_NONE);

export class Spawn {
    static CreateSpawn(name: string) {
        if (IsServer()) {
            const spawnGood = Entities.FindByName(undefined, name + "_good");
            const spawnBad = Entities.FindByName(undefined, name + "_bad");


            Spawn.SpawnCamp(spawnGood, spawnBad, true, 2);
            Spawn.SpawnCamp(spawnBad, spawnGood, false, 2);
        }
    }


    private static SpawnCamp(entity: C_BaseEntity, target: C_BaseEntity, good: boolean, difficulty: number) {

        const team = good ? DOTATeam_t.DOTA_TEAM_GOODGUYS : DOTATeam_t.DOTA_TEAM_BADGUYS;

        // const unitsAlreadyThere = FindUnitsInRadius(
        //     team,
        //     entity.GetAbsOrigin(),
        //     null,
        //     300,
        //     DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY,
        //     DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP,
        //     DOTA_UNIT_TARGET_FLAGS.DOTA_UNIT_TARGET_FLAG_NONE,
        //     FindType_t.FIND_ANY_ORDER,
        //     false
        // ).length > 0;


        if (true) {

            const unitName = good ? "npc_dota_custom_shinobi" : "npc_dota_custom_zetsu_creep";

            for (let i = 0; i < difficulty; i++) {
                const unit = CreateUnitByName(
                    unitName,
                    entity.GetAbsOrigin(),
                    true,
                    null,
                    null,
                    team
                );

                Timers.CreateTimer(0.5, () => {
                    unit.MoveToPositionAggressive(target.GetAbsOrigin());
                    unit.AddNewModifier(
                        unit,
                        null,
                        "modifier_kill",
                        {duration: 30}
                    )
                })

            }
        }


        const delay = 15;

        Timers.CreateTimer(delay, () => {
            // respawn
            Spawn.SpawnCamp(entity, target, good, difficulty);
        })
    }
}