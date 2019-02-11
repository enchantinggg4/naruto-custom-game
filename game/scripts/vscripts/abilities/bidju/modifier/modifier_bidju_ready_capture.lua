modifier_bidju_ready_capture = class({})


--"IsHidden"			"0"
--"IsBuff"			"1"
--"IsDebuff"			"0"
--"IsStunDebuff"		"0"
--"IsPurgable"		"0"
--
--"EffectName"      		"particles/abilities/rasengan/rasengan_active.vpcf"
--"EffectAttachType"      "point_follow"
--"Target"                "CASTER"
--"Duration"              "%duration"
--        -createhero npc_dota_custom_bidju_shukaku enemy
--        -createhero npc_dota_custom_bidju_shukaku enemy
--Modifier script abilities/bidju/modifier/bidju_modifier failed to find class named modifier_bidju_ready_capture.
function modifier_bidju_ready_capture:IsHidden()
    return false
end

function modifier_bidju_ready_capture:IsBuff()
    return true
end

function modifier_bidju_ready_capture:IsStunDebuff()
    return false
end

function modifier_bidju_ready_capture:IsPurgable()
    return false
end

function modifier_bidju_ready_capture:Duration()
    return 1000000
end