--[[ Generated with https://github.com/Perryvw/TypescriptToLua ]]
modifier_bidju_ready_capture = modifier_bidju_ready_capture or {};
modifier_bidju_ready_capture.__index = modifier_bidju_ready_capture;
modifier_bidju_ready_capture.new = function(construct, ...)
    local self = setmetatable({}, modifier_bidju_ready_capture);
    if construct and modifier_bidju_ready_capture.constructor then
        modifier_bidju_ready_capture.constructor(self, ...);
    end
    return self;
end;
modifier_bidju_ready_capture.constructor = function(self)
end;
modifier_bidju_ready_capture.IsStunDebuff = function(self)
    return false;
end;
modifier_bidju_ready_capture.IsHidden = function(self)
    return false;
end;
modifier_bidju_ready_capture.GetDuration = function(self)
    return 10000000;
end;
modifier_bidju_ready_capture.IsPurgable = function(self)
    return false;
end;
