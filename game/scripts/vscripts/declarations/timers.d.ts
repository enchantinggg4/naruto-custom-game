declare interface Timers {
    CreateTimer(delay: number, callback: () => void|number): void;
    CreateTimer<T>(delay: number, callback: (context: T) => void|number, context: T): void;
}
declare var Timers: Timers;



declare function DebugPrint(some: any): void;
declare function Dynamic_Wrap(some: any, some2: any): any;
