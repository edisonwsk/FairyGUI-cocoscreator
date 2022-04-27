declare module "cc/editor/animation-clip-migration" {
    export import AnimationClipLegacyData = AnimationClip._legacy.AnimationClipLegacyData;
    import { AnimationClip } from "cc";
    export {};
}
declare module "cc/editor/distributed" {
    export function isClientLoad(obj: CCObject): boolean;
    export function setClientLoad(obj: CCObject, value: boolean): void;
    import { CCObject } from "cc";
    export {};
}
declare module "cc/editor/exotic-animation" {
    export const exoticAnimationTag: unique symbol;
    /**
     * Animation that:
     * - does not exposed by users;
     * - does not compatible with regular animation;
     * - non-editable;
     * - currently only generated imported from model file.
     */
    export class ExoticAnimation {
        createEvaluator(binder: ___private._cocos_core_animation_tracks_track__Binder): ___private._cocos_core_animation_exotic_animation_exotic_animation__ExoticTrsAnimationEvaluator;
        addNodeAnimation(path: string): ___private._cocos_core_animation_exotic_animation_exotic_animation__ExoticNodeAnimation;
        collectAnimatedJoints(): string[];
        split(from: number, to: number): ExoticAnimation;
        /**
         * @internal
         */
        toHashString(): string;
    }
    import { __private as ___private } from "cc";
    export {};
}
declare module "cc/editor/macro" {
    export { macro } from "cc";
    export {};
}
declare module "cc/editor/new-gen-anim" {
    export function blend1D(weights: number[], thresholds: readonly number[], value: number): void;
    /**
     * Blends given samples using simple directional algorithm.
     * @param weights Result weights of each sample.
     * @param samples Every samples' parameter.
     * @param input Input parameter.
     */
    export const blendSimpleDirectional: (weights: number[], samples: readonly math.Vec2[], input: Readonly<math.Vec2>) => void;
    /**
     * Validates the samples if they satisfied the requirements of simple directional algorithm.
     * @param samples Samples to validate.
     * @returns Issues the samples containing.
     */
    export function validateSimpleDirectionalSamples(samples: ReadonlyArray<math.Vec2>): SimpleDirectionalSampleIssue[];
    /**
     * Simple directional issue representing some samples have same(or very similar) direction.
     */
    export class SimpleDirectionalIssueSameDirection {
        samples: readonly number[];
        constructor(samples: readonly number[]);
    }
    export type SimpleDirectionalSampleIssue = SimpleDirectionalIssueSameDirection;
    export class InvalidTransitionError extends Error {
        constructor(type: "to-entry" | "to-any" | "from-exit");
    }
    export class VariableNotDefinedError extends Error {
        constructor(name: string);
    }
    export class AnimationGraph extends Asset implements animation.AnimationGraphRunTime {
        readonly __brand: "AnimationGraph";
        constructor();
        onLoaded(): void;
        get layers(): readonly Layer[];
        get variables(): Iterable<[
            string,
            {
                type: animation.VariableType;
                value: Value;
            }
        ]>;
        /**
         * Adds a layer.
         * @returns The new layer.
         */
        addLayer(): Layer;
        /**
         * Removes a layer.
         * @param index Index to the layer to remove.
         */
        removeLayer(index: number): void;
        /**
         * Adjusts the layer's order.
         * @param index
         * @param newIndex
         */
        moveLayer(index: number, newIndex: number): void;
        addVariable(name: string, type: animation.VariableType, value?: Value): void;
        removeVariable(name: string): void;
        getVariable(name: string): Variable;
    }
    export enum LayerBlending {
        override = 0,
        additive = 1
    }
    export function isAnimationTransition(transition: Transition): transition is AnimationTransition;
    export class StateMachine extends ___private._cocos_core_data_editor_extendable__EditorExtendable {
        /**
         * // TODO: HACK
         * @internal
         */
        __callOnAfterDeserializeRecursive(): void;
        /**
         * @internal
         */
        constructor();
        [___private._cocos_core_data_deserialize_symbols__onAfterDeserializedTag](): void;
        [__private._cocos_core_animation_marionette_create_eval__createEval](context: __private._cocos_core_animation_marionette_motion__MotionEvalContext): __private._cocos_core_animation_marionette_motion__MotionEval | null;
        /**
         * The entry state.
         */
        get entryState(): State;
        /**
         * The exit state.
         */
        get exitState(): State;
        /**
         * The any state.
         */
        get anyState(): State;
        /**
         * Gets an iterator to all states within this graph.
         * @returns The iterator.
         */
        states(): Iterable<State>;
        /**
         * Gets an iterator to all transitions within this graph.
         * @returns The iterator.
         */
        transitions(): Iterable<__private._cocos_core_animation_marionette_animation_graph__Transition>;
        /**
         * Gets the transitions between specified states.
         * @param from Transition source.
         * @param to Transition target.
         * @returns Iterator to the transitions
         */
        getTransitionsBetween(from: State, to: State): Iterable<__private._cocos_core_animation_marionette_animation_graph__Transition>;
        /**
         * Gets all outgoing transitions of specified state.
         * @param to The state.
         * @returns Result transitions.
         */
        getOutgoings(from: State): Iterable<__private._cocos_core_animation_marionette_animation_graph__Transition>;
        /**
         * Gets all incoming transitions of specified state.
         * @param to The state.
         * @returns Result transitions.
         */
        getIncomings(to: State): Iterable<__private._cocos_core_animation_marionette_animation_graph__Transition>;
        /**
         * Adds a motion state into this state machine.
         * @returns The newly created motion.
         */
        addMotion(): MotionState;
        /**
         * Adds a sub state machine into this state machine.
         * @returns The newly created state machine.
         */
        addSubStateMachine(): SubStateMachine;
        /**
         * Removes specified state from this state machine.
         * @param state The state to remove.
         */
        remove(state: State): void;
        /**
         * Connect two states.
         * @param from Source state.
         * @param to Target state.
         * @param condition The transition condition.
         */
        connect(from: MotionState, to: State, conditions?: Condition[]): AnimationTransition;
        /**
         * Connect two states.
         * @param from Source state.
         * @param to Target state.
         * @param condition The transition condition.
         * @throws `InvalidTransitionError` if:
         * - the target state is entry or any, or
         * - the source state is exit.
         */
        connect(from: State, to: State, conditions?: Condition[]): Transition;
        disconnect(from: State, to: State): void;
        removeTransition(removal: __private._cocos_core_animation_marionette_animation_graph__Transition): void;
        eraseOutgoings(from: State): void;
        eraseIncomings(to: State): void;
        eraseTransitionsIncludes(state: State): void;
        clone(): StateMachine;
    }
    export class SubStateMachine extends __private._cocos_core_animation_marionette_state__InteractiveState {
        get stateMachine(): StateMachine;
        clone(): SubStateMachine;
    }
    export type Transition = Omit<__private._cocos_core_animation_marionette_animation_graph__Transition, "from" | "to"> & {
        readonly from: __private._cocos_core_animation_marionette_animation_graph__Transition["from"];
        readonly to: __private._cocos_core_animation_marionette_animation_graph__Transition["to"];
    };
    export type AnimationTransition = Omit<__private._cocos_core_animation_marionette_animation_graph__AnimationTransition, "from" | "to"> & {
        readonly from: __private._cocos_core_animation_marionette_animation_graph__AnimationTransition["from"];
        readonly to: __private._cocos_core_animation_marionette_animation_graph__AnimationTransition["to"];
    };
    export class Layer implements __private._cocos_core_animation_marionette_ownership__OwnedBy<AnimationGraph> {
        [__private._cocos_core_animation_marionette_ownership__ownerSymbol]: AnimationGraph | undefined;
        name: string;
        weight: number;
        mask: ___private._cocos_core_animation_skeleton_mask__SkeletonMask | null;
        blending: LayerBlending;
        /**
         * @internal
         */
        constructor();
        get stateMachine(): StateMachine;
    }
    export class State extends ___private._cocos_core_data_editor_extendable__EditorExtendable implements __private._cocos_core_animation_marionette_ownership__OwnedBy<Layer | StateMachine> {
        [__private._cocos_core_animation_marionette_ownership__ownerSymbol]: StateMachine | undefined;
        name: string;
        [__private._cocos_core_animation_marionette_state__outgoingsSymbol]: __private._cocos_core_animation_marionette_animation_graph__TransitionInternal[];
        [__private._cocos_core_animation_marionette_state__incomingsSymbol]: __private._cocos_core_animation_marionette_animation_graph__TransitionInternal[];
        /**
         * @internal
         */
        constructor();
    }
    export class Variable {
        constructor(type?: animation.VariableType);
        get type(): animation.VariableType;
        get value(): Value;
        set value(value: Value);
    }
    export class BinaryCondition implements Condition {
        static readonly Operator: typeof __private._cocos_core_animation_marionette_condition__BinaryOperator;
        operator: __private._cocos_core_animation_marionette_condition__BinaryOperator;
        lhs: BindableNumber;
        rhs: BindableNumber;
        clone(): BinaryCondition;
        [__private._cocos_core_animation_marionette_create_eval__createEval](context: __private._cocos_core_animation_marionette_parametric__BindContext): __private._cocos_core_animation_marionette_condition__BinaryConditionEval;
    }
    export namespace BinaryCondition {
        export type Operator = __private._cocos_core_animation_marionette_condition__BinaryOperator;
    }
    export class UnaryCondition implements Condition {
        static readonly Operator: typeof __private._cocos_core_animation_marionette_condition__UnaryOperator;
        operator: __private._cocos_core_animation_marionette_condition__UnaryOperator;
        operand: BindableBoolean;
        clone(): UnaryCondition;
        [__private._cocos_core_animation_marionette_create_eval__createEval](context: __private._cocos_core_animation_marionette_condition__ConditionEvalContext): __private._cocos_core_animation_marionette_condition__UnaryConditionEval;
    }
    export namespace UnaryCondition {
        export type Operator = __private._cocos_core_animation_marionette_condition__UnaryOperator;
    }
    export class TriggerCondition implements Condition {
        trigger: string;
        clone(): TriggerCondition;
        [__private._cocos_core_animation_marionette_create_eval__createEval](context: __private._cocos_core_animation_marionette_parametric__BindContext): __private._cocos_core_animation_marionette_condition__ConditionEval;
    }
    export interface Condition {
        clone(): Condition;
        [__private._cocos_core_animation_marionette_create_eval__createEval](context: __private._cocos_core_animation_marionette_parametric__BindContext): __private._cocos_core_animation_marionette_condition__ConditionEval;
    }
    export type Value = number | string | boolean;
    export class MotionState extends __private._cocos_core_animation_marionette_state__InteractiveState {
        motion: __private._cocos_core_animation_marionette_motion__Motion | null;
        speed: BindableNumber;
        clone(): MotionState;
    }
    export class ClipMotion extends ___private._cocos_core_data_editor_extendable__EditorExtendable implements __private._cocos_core_animation_marionette_motion__Motion {
        clip: AnimationClip | null;
        [__private._cocos_core_animation_marionette_create_eval__createEval](context: __private._cocos_core_animation_marionette_motion__MotionEvalContext): __private._cocos_core_animation_marionette_clip_motion__ClipMotionEval | null;
        clone(): ClipMotion;
    }
    export interface AnimationBlend extends __private._cocos_core_animation_marionette_motion__Motion, ___private._cocos_core_data_editor_extendable__EditorExtendable {
        [__private._cocos_core_animation_marionette_create_eval__createEval](_context: __private._cocos_core_animation_marionette_motion__MotionEvalContext): __private._cocos_core_animation_marionette_motion__MotionEval | null;
    }
    export class AnimationBlend extends ___private._cocos_core_data_editor_extendable__EditorExtendable implements __private._cocos_core_animation_marionette_motion__Motion {
        name: string;
    }
    export class AnimationBlendDirect extends AnimationBlend {
        static Item: typeof __private._cocos_core_animation_marionette_animation_blend_direct__AnimationBlendDirectItem;
        get items(): __private._cocos_core_animation_marionette_animation_blend_direct__AnimationBlendDirectItem[];
        set items(value: __private._cocos_core_animation_marionette_animation_blend_direct__AnimationBlendDirectItem[]);
        clone(): AnimationBlendDirect;
        [__private._cocos_core_animation_marionette_create_eval__createEval](context: __private._cocos_core_animation_marionette_motion__MotionEvalContext): __private._cocos_core_animation_marionette_animation_blend_direct__AnimationBlendDirectEval;
    }
    export namespace AnimationBlendDirect {
        export type Item = __private._cocos_core_animation_marionette_animation_blend_direct__AnimationBlendDirectItem;
    }
    export class AnimationBlend1D extends AnimationBlend {
        static Item: typeof __private._cocos_core_animation_marionette_animation_blend_1d__AnimationBlend1DItem;
        param: BindableNumber;
        get items(): Iterable<__private._cocos_core_animation_marionette_animation_blend_1d__AnimationBlend1DItem>;
        set items(value: Iterable<__private._cocos_core_animation_marionette_animation_blend_1d__AnimationBlend1DItem>);
        clone(): AnimationBlend1D;
        [__private._cocos_core_animation_marionette_create_eval__createEval](context: __private._cocos_core_animation_marionette_motion__MotionEvalContext): __private._cocos_core_animation_marionette_animation_blend_1d__AnimationBlend1DEval;
    }
    export namespace AnimationBlend1D {
        export type Item = __private._cocos_core_animation_marionette_animation_blend_1d__AnimationBlend1DItem;
    }
    export class AnimationBlend2D extends AnimationBlend {
        static Algorithm: typeof __private._cocos_core_animation_marionette_animation_blend_2d__Algorithm;
        static Item: typeof __private._cocos_core_animation_marionette_animation_blend_2d__AnimationBlend2DItem;
        algorithm: __private._cocos_core_animation_marionette_animation_blend_2d__Algorithm;
        paramX: BindableNumber;
        paramY: BindableNumber;
        get items(): Iterable<__private._cocos_core_animation_marionette_animation_blend_2d__AnimationBlend2DItem>;
        set items(items: Iterable<__private._cocos_core_animation_marionette_animation_blend_2d__AnimationBlend2DItem>);
        clone(): AnimationBlend2D;
        [__private._cocos_core_animation_marionette_create_eval__createEval](context: __private._cocos_core_animation_marionette_motion__MotionEvalContext): __private._cocos_core_animation_marionette_animation_blend_2d__AnimationBlend2DEval;
    }
    export namespace AnimationBlend2D {
        export type Algorithm = typeof __private._cocos_core_animation_marionette_animation_blend_2d__Algorithm;
        export type Item = __private._cocos_core_animation_marionette_animation_blend_2d__AnimationBlend2DItem;
    }
    export class BindableNumber implements __private._cocos_core_animation_marionette_parametric__Bindable<number> {
        variable: string;
        value: number;
        constructor(value?: number);
        clone(): __private._cocos_core_animation_marionette_parametric__Bindable<number>;
    }
    export class BindableBoolean implements __private._cocos_core_animation_marionette_parametric__Bindable<boolean> {
        variable: string;
        value: boolean;
        constructor(value?: boolean);
        clone(): __private._cocos_core_animation_marionette_parametric__Bindable<boolean>;
    }
    export function __getDemoGraphs(): Record<string, AnimationGraph>;
    export import VariableType = animation.VariableType;
    export namespace __private {
        export const _cocos_core_animation_marionette_create_eval__createEval: unique symbol;
        export class _cocos_core_animation_marionette_graph_eval__VarInstance {
            type: animation.VariableType;
            constructor(type: animation.VariableType, value: Value);
            get value(): Value;
            set value(value: Value);
            bind<T, TThis, ExtraArgs extends any[]>(fn: (this: TThis, value: T, ...args: ExtraArgs) => void, thisArg: TThis, ...args: ExtraArgs): Value;
        }
        export interface _cocos_core_animation_marionette_parametric__BindContext {
            getVar(id: string): _cocos_core_animation_marionette_graph_eval__VarInstance | undefined;
        }
        export interface _cocos_core_animation_marionette_motion__MotionEvalContext extends _cocos_core_animation_marionette_parametric__BindContext {
            node: Node;
            blendBuffer: ___private._cocos_3d_skeletal_animation_skeletal_animation_blending__BlendStateBuffer;
            mask?: ___private._cocos_core_animation_skeleton_mask__SkeletonMask;
        }
        export interface _cocos_core_animation_marionette_motion__MotionEval {
            readonly duration: number;
            sample(progress: number, baseWeight: number): void;
            getClipStatuses(baseWeight: number): Iterator<animation.ClipStatus>;
        }
        export const _cocos_core_animation_marionette_ownership__ownerSymbol: unique symbol;
        export interface _cocos_core_animation_marionette_ownership__OwnedBy<T> {
            [_cocos_core_animation_marionette_ownership__ownerSymbol]: T | undefined;
        }
        export class _cocos_core_animation_marionette_animation_graph__Transition extends ___private._cocos_core_data_editor_extendable__EditorExtendable implements _cocos_core_animation_marionette_ownership__OwnedBy<StateMachine>, _cocos_core_animation_marionette_animation_graph__Transition {
            [_cocos_core_animation_marionette_ownership__ownerSymbol]: StateMachine | undefined;
            /**
             * The transition source.
             */
            from: State;
            /**
             * The transition target.
             */
            to: State;
            /**
             * The transition condition.
             */
            conditions: Condition[];
            /**
             * @internal
             */
            constructor(from: State, to: State, conditions?: Condition[]);
            [_cocos_core_animation_marionette_ownership__ownerSymbol]: StateMachine | undefined;
        }
        export type _cocos_core_animation_marionette_state__StateMachineComponentConstructor<T extends animation.StateMachineComponent> = ___private._types_globals__Constructor<T>;
        export class _cocos_core_animation_marionette_state__InteractiveState extends State {
            get components(): Iterable<animation.StateMachineComponent>;
            addComponent<T extends animation.StateMachineComponent>(constructor: _cocos_core_animation_marionette_state__StateMachineComponentConstructor<T>): T;
            removeComponent(component: animation.StateMachineComponent): void;
            instantiateComponents(): animation.StateMachineComponent[];
        }
        export class _cocos_core_animation_marionette_animation_graph__AnimationTransition extends _cocos_core_animation_marionette_animation_graph__Transition {
            /**
             * The transition duration.
             * The unit of the duration is the real duration of transition source
             * if `relativeDuration` is `true` or seconds otherwise.
             */
            duration: number;
            /**
             * Determines the unit of transition duration. See `duration`.
             */
            relativeDuration: boolean;
            exitConditionEnabled: boolean;
            get exitCondition(): number;
            set exitCondition(value: number);
        }
        export const _cocos_core_animation_marionette_state__outgoingsSymbol: unique symbol;
        export type _cocos_core_animation_marionette_animation_graph__TransitionInternal = _cocos_core_animation_marionette_animation_graph__Transition;
        export const _cocos_core_animation_marionette_state__incomingsSymbol: unique symbol;
        export enum _cocos_core_animation_marionette_condition__BinaryOperator {
            EQUAL_TO = 0,
            NOT_EQUAL_TO = 1,
            LESS_THAN = 2,
            LESS_THAN_OR_EQUAL_TO = 3,
            GREATER_THAN = 4,
            GREATER_THAN_OR_EQUAL_TO = 5
        }
        export interface _cocos_core_animation_marionette_condition__ConditionEval {
            /**
             * Evaluates this condition.
             */
            eval(): boolean;
        }
        export class _cocos_core_animation_marionette_condition__BinaryConditionEval implements _cocos_core_animation_marionette_condition__ConditionEval {
            constructor(operator: _cocos_core_animation_marionette_condition__BinaryOperator, lhs: number, rhs: number);
            reset(lhs: number, rhs: number): void;
            setLhs(value: number): void;
            setRhs(value: number): void;
            /**
             * Evaluates this condition.
             */
            eval(): boolean;
        }
        export enum _cocos_core_animation_marionette_condition__UnaryOperator {
            TRUTHY = 0,
            FALSY = 1
        }
        export type _cocos_core_animation_marionette_condition__ConditionEvalContext = _cocos_core_animation_marionette_parametric__BindContext;
        export class _cocos_core_animation_marionette_condition__UnaryConditionEval implements _cocos_core_animation_marionette_condition__ConditionEval {
            constructor(operator: _cocos_core_animation_marionette_condition__UnaryOperator, operand: boolean);
            reset(value: boolean): void;
            setOperand(value: boolean): void;
            /**
             * Evaluates this condition.
             */
            eval(): boolean;
        }
        export interface _cocos_core_animation_marionette_motion__Motion {
            [_cocos_core_animation_marionette_create_eval__createEval](context: _cocos_core_animation_marionette_motion__MotionEvalContext): _cocos_core_animation_marionette_motion__MotionEval | null;
            clone(): _cocos_core_animation_marionette_motion__Motion;
        }
        export class _cocos_core_animation_marionette_clip_motion__ClipMotionEval implements _cocos_core_animation_marionette_motion__MotionEval {
            __DEBUG__ID__?: string;
            readonly duration: number;
            constructor(context: _cocos_core_animation_marionette_motion__MotionEvalContext, clip: AnimationClip);
            getClipStatuses(baseWeight: number): Iterator<animation.ClipStatus, any, undefined>;
            get progress(): number;
            sample(progress: number, weight: number): void;
        }
        export class _cocos_core_animation_marionette_animation_blend__AnimationBlendItem {
            motion: _cocos_core_animation_marionette_motion__Motion | null;
            clone(): _cocos_core_animation_marionette_animation_blend__AnimationBlendItem;
            protected _assign(that: _cocos_core_animation_marionette_animation_blend__AnimationBlendItem): _cocos_core_animation_marionette_animation_blend__AnimationBlendItem;
        }
        export class _cocos_core_animation_marionette_animation_blend_direct__AnimationBlendDirectItem extends _cocos_core_animation_marionette_animation_blend__AnimationBlendItem {
            weight: number;
            clone(): _cocos_core_animation_marionette_animation_blend_direct__AnimationBlendDirectItem;
            protected _assign(that: _cocos_core_animation_marionette_animation_blend_direct__AnimationBlendDirectItem): _cocos_core_animation_marionette_animation_blend_direct__AnimationBlendDirectItem;
        }
        export class _cocos_core_animation_marionette_animation_blend__AnimationBlendEval implements _cocos_core_animation_marionette_motion__MotionEval {
            constructor(context: _cocos_core_animation_marionette_motion__MotionEvalContext, children: _cocos_core_animation_marionette_animation_blend__AnimationBlendItem[], inputs: number[]);
            get duration(): number;
            getClipStatuses(baseWeight: number): Iterator<animation.ClipStatus, any, undefined>;
            sample(progress: number, weight: number): void;
            setInput(value: number, index: number): void;
            protected doEval(): void;
            protected eval(_weights: number[], _inputs: readonly number[]): void;
        }
        export class _cocos_core_animation_marionette_animation_blend_direct__AnimationBlendDirectEval extends _cocos_core_animation_marionette_animation_blend__AnimationBlendEval {
            constructor(...args: ConstructorParameters<typeof _cocos_core_animation_marionette_animation_blend__AnimationBlendEval>);
            protected eval(weights: number[], inputs: readonly number[]): void;
        }
        export class _cocos_core_animation_marionette_animation_blend_1d__AnimationBlend1DItem extends _cocos_core_animation_marionette_animation_blend__AnimationBlendItem {
            threshold: number;
            clone(): _cocos_core_animation_marionette_animation_blend_1d__AnimationBlend1DItem;
            protected _assign(that: _cocos_core_animation_marionette_animation_blend_1d__AnimationBlend1DItem): _cocos_core_animation_marionette_animation_blend_1d__AnimationBlend1DItem;
        }
        export class _cocos_core_animation_marionette_animation_blend_1d__AnimationBlend1DEval extends _cocos_core_animation_marionette_animation_blend__AnimationBlendEval {
            constructor(context: _cocos_core_animation_marionette_motion__MotionEvalContext, items: _cocos_core_animation_marionette_animation_blend__AnimationBlendItem[], thresholds: readonly number[], input: number);
            protected eval(weights: number[], [value]: readonly [
                number
            ]): void;
        }
        export enum _cocos_core_animation_marionette_animation_blend_2d__Algorithm {
            SIMPLE_DIRECTIONAL = 0,
            FREEFORM_CARTESIAN = 1,
            FREEFORM_DIRECTIONAL = 2
        }
        export class _cocos_core_animation_marionette_animation_blend_2d__AnimationBlend2DItem extends _cocos_core_animation_marionette_animation_blend__AnimationBlendItem {
            threshold: math.Vec2;
            clone(): _cocos_core_animation_marionette_animation_blend_2d__AnimationBlend2DItem;
            protected _assign(that: _cocos_core_animation_marionette_animation_blend_2d__AnimationBlend2DItem): _cocos_core_animation_marionette_animation_blend_2d__AnimationBlend2DItem;
        }
        export class _cocos_core_animation_marionette_animation_blend_2d__AnimationBlend2DEval extends _cocos_core_animation_marionette_animation_blend__AnimationBlendEval {
            constructor(context: _cocos_core_animation_marionette_motion__MotionEvalContext, items: _cocos_core_animation_marionette_animation_blend__AnimationBlendItem[], thresholds: readonly math.Vec2[], algorithm: _cocos_core_animation_marionette_animation_blend_2d__Algorithm, inputs: [
                number,
                number
            ]);
            protected eval(weights: number[], [x, y]: [
                number,
                number
            ]): void;
        }
        export interface _cocos_core_animation_marionette_parametric__Bindable<TValue> {
            value: TValue;
            variable: string;
            clone(): _cocos_core_animation_marionette_parametric__Bindable<TValue>;
        }
    }
    import { math, animation, Asset, __private as ___private, Node, AnimationClip } from "cc";
    export {};
}
declare module "cc/editor/offline-mappings" {
    export const effectStructure: {
        $techniques: {
            $passes: {
                depthStencilState: {};
                rasterizerState: {};
                blendState: {
                    targets: {}[];
                };
                properties: {
                    any: {
                        sampler: {};
                        editor: {};
                    };
                };
                migrations: {
                    properties: {
                        any: {};
                    };
                    macros: {
                        any: {};
                    };
                };
                embeddedMacros: {};
            }[];
        }[];
    };
    export const isSampler: (type: any) => boolean;
    export const typeMap: Record<string, gfx.Type | string>;
    export const formatMap: {
        bool: gfx.Format;
        bvec2: gfx.Format;
        bvec3: gfx.Format;
        bvec4: gfx.Format;
        int: gfx.Format;
        ivec2: gfx.Format;
        ivec3: gfx.Format;
        ivec4: gfx.Format;
        uint: gfx.Format;
        uvec2: gfx.Format;
        uvec3: gfx.Format;
        uvec4: gfx.Format;
        float: gfx.Format;
        vec2: gfx.Format;
        vec3: gfx.Format;
        vec4: gfx.Format;
        int8_t: gfx.Format;
        i8vec2: gfx.Format;
        i8vec3: gfx.Format;
        i8vec4: gfx.Format;
        uint8_t: gfx.Format;
        u8vec2: gfx.Format;
        u8vec3: gfx.Format;
        u8vec4: gfx.Format;
        int16_t: gfx.Format;
        i16vec2: gfx.Format;
        i16vec3: gfx.Format;
        i16vec4: gfx.Format;
        uint16_t: gfx.Format;
        u16vec2: gfx.Format;
        u16vec3: gfx.Format;
        u16vec4: gfx.Format;
        float16_t: gfx.Format;
        f16vec2: gfx.Format;
        f16vec3: gfx.Format;
        f16vec4: gfx.Format;
        mat2: gfx.Format;
        mat3: gfx.Format;
        mat4: gfx.Format;
        mat2x2: gfx.Format;
        mat3x3: gfx.Format;
        mat4x4: gfx.Format;
        mat2x3: gfx.Format;
        mat2x4: gfx.Format;
        mat3x2: gfx.Format;
        mat3x4: gfx.Format;
        mat4x2: gfx.Format;
        mat4x3: gfx.Format;
    };
    export const getFormat: (name: string) => any;
    export const getShaderStage: (name: string) => any;
    export const getDescriptorType: (name: string) => any;
    export const isNormalized: (format: string) => boolean;
    export const isPaddedMatrix: (type: any) => boolean;
    export const getMemoryAccessFlag: (access: string) => gfx.MemoryAccessBit;
    export const passParams: {
        NONE: gfx.ColorMask;
        R: gfx.ColorMask;
        G: gfx.ColorMask;
        B: gfx.ColorMask;
        A: gfx.ColorMask;
        RG: number;
        RB: number;
        RA: number;
        GB: number;
        GA: number;
        BA: number;
        RGB: number;
        RGA: number;
        RBA: number;
        GBA: number;
        ALL: gfx.ColorMask;
        ADD: gfx.BlendOp;
        SUB: gfx.BlendOp;
        REV_SUB: gfx.BlendOp;
        MIN: gfx.BlendOp;
        MAX: gfx.BlendOp;
        ZERO: gfx.BlendFactor;
        ONE: gfx.BlendFactor;
        SRC_ALPHA: gfx.BlendFactor;
        DST_ALPHA: gfx.BlendFactor;
        ONE_MINUS_SRC_ALPHA: gfx.BlendFactor;
        ONE_MINUS_DST_ALPHA: gfx.BlendFactor;
        SRC_COLOR: gfx.BlendFactor;
        DST_COLOR: gfx.BlendFactor;
        ONE_MINUS_SRC_COLOR: gfx.BlendFactor;
        ONE_MINUS_DST_COLOR: gfx.BlendFactor;
        SRC_ALPHA_SATURATE: gfx.BlendFactor;
        CONSTANT_COLOR: gfx.BlendFactor;
        ONE_MINUS_CONSTANT_COLOR: gfx.BlendFactor;
        CONSTANT_ALPHA: gfx.BlendFactor;
        ONE_MINUS_CONSTANT_ALPHA: gfx.BlendFactor;
        KEEP: gfx.StencilOp;
        REPLACE: gfx.StencilOp;
        INCR: gfx.StencilOp;
        DECR: gfx.StencilOp;
        INVERT: gfx.StencilOp;
        INCR_WRAP: gfx.StencilOp;
        DECR_WRAP: gfx.StencilOp;
        NEVER: gfx.ComparisonFunc;
        LESS: gfx.ComparisonFunc;
        EQUAL: gfx.ComparisonFunc;
        LESS_EQUAL: gfx.ComparisonFunc;
        GREATER: gfx.ComparisonFunc;
        NOT_EQUAL: gfx.ComparisonFunc;
        GREATER_EQUAL: gfx.ComparisonFunc;
        ALWAYS: gfx.ComparisonFunc;
        FRONT: gfx.CullMode;
        BACK: gfx.CullMode;
        GOURAND: gfx.ShadeModel;
        FLAT: gfx.ShadeModel;
        FILL: gfx.PolygonMode;
        LINE: gfx.PolygonMode;
        POINT: gfx.PolygonMode;
        POINT_LIST: gfx.PrimitiveMode;
        LINE_LIST: gfx.PrimitiveMode;
        LINE_STRIP: gfx.PrimitiveMode;
        LINE_LOOP: gfx.PrimitiveMode;
        TRIANGLE_LIST: gfx.PrimitiveMode;
        TRIANGLE_STRIP: gfx.PrimitiveMode;
        TRIANGLE_FAN: gfx.PrimitiveMode;
        LINE_LIST_ADJACENCY: gfx.PrimitiveMode;
        LINE_STRIP_ADJACENCY: gfx.PrimitiveMode;
        TRIANGLE_LIST_ADJACENCY: gfx.PrimitiveMode;
        TRIANGLE_STRIP_ADJACENCY: gfx.PrimitiveMode;
        TRIANGLE_PATCH_ADJACENCY: gfx.PrimitiveMode;
        QUAD_PATCH_LIST: gfx.PrimitiveMode;
        ISO_LINE_LIST: gfx.PrimitiveMode;
        LINEAR: gfx.Filter;
        ANISOTROPIC: gfx.Filter;
        WRAP: gfx.Address;
        MIRROR: gfx.Address;
        CLAMP: gfx.Address;
        BORDER: gfx.Address;
        LINE_WIDTH: gfx.DynamicStateFlagBit;
        DEPTH_BIAS: gfx.DynamicStateFlagBit;
        BLEND_CONSTANTS: gfx.DynamicStateFlagBit;
        DEPTH_BOUNDS: gfx.DynamicStateFlagBit;
        STENCIL_WRITE_MASK: gfx.DynamicStateFlagBit;
        STENCIL_COMPARE_MASK: gfx.DynamicStateFlagBit;
        TRUE: boolean;
        FALSE: boolean;
    };
    export import Sampler = gfx.Sampler;
    export import SamplerInfo = gfx.SamplerInfo;
    export import SetIndex = pipeline.SetIndex;
    export import RenderPriority = pipeline.RenderPriority;
    export import GetTypeSize = gfx.GetTypeSize;
    export { murmurhash2_32_gc } from "cc";
    import { gfx, pipeline } from "cc";
    export {};
}
declare module "cc/editor/particle-system-2d-utils" {
    /**
     * A png file reader
     * @name PNGReader
     */
    export class PNGReader {
        constructor(data: any);
        read(bytes: any): any[];
        readUInt32(): number;
        readUInt16(): number;
        decodePixels(data: any): Uint8Array;
        copyToImageData(imageData: any, pixels: any): void;
        decodePalette(): Uint8Array;
        render(canvas: any): any;
    }
    /**
     * cc.tiffReader is a singleton object, it's a tiff file reader, it can parse byte array to draw into a canvas
     * @class
     * @name tiffReader
     */
    export class TiffReader {
        constructor();
        getUint8(offset: any): never;
        getUint16(offset: any): number;
        getUint32(offset: any): number;
        checkLittleEndian(): boolean;
        hasTowel(): boolean;
        getFieldTypeName(fieldType: any): any;
        getFieldTagName(fieldTag: any): any;
        getFieldTypeLength(fieldTypeName: any): 1 | 0 | 4 | 2 | 8;
        getFieldValues(fieldTagName: any, fieldTypeName: any, typeCount: any, valueOffset: any): any[];
        getBytes(numBytes: any, offset: any): number;
        getBits(numBits: any, byteOffset: any, bitOffset: any): {
            bits: number;
            byteOffset: any;
            bitOffset: number;
        };
        parseFileDirectory(offset: any): void;
        clampColorSample(colorSample: any, bitsPerSample: any): number;
        /**
         * @function
         * @param {Array} tiffData
         * @param {HTMLCanvasElement} canvas
         * @returns {*}
         */
        parseTIFF(tiffData: any, canvas: any): any;
    }
    export function getImageFormatByData(imgData: any): ImageFormat.PNG | ImageFormat.TIFF | ImageFormat.UNKNOWN;
    /**
     * Image formats
     * @enum macro.ImageFormat
     */
    export enum ImageFormat {
        /**
         * @en Image Format:JPG
         * @zh 图片格式:JPG
         */
        JPG = 0,
        /**
         * @en Image Format:PNG
         * @zh 图片格式:PNG
         */
        PNG = 1,
        /**
         * @en Image Format:TIFF
         * @zh 图片格式:TIFF
         */
        TIFF = 2,
        /**
         * @en Image Format:WEBP
         * @zh 图片格式:WEBP
         */
        WEBP = 3,
        /**
         * @en Image Format:PVR
         * @zh 图片格式:PVR
         */
        PVR = 4,
        /**
         * @en Image Format:ETC
         * @zh 图片格式:ETC
         */
        ETC = 5,
        /**
         * @en Image Format:S3TC
         * @zh 图片格式:S3TC
         */
        S3TC = 6,
        /**
         * @en Image Format:ATITC
         * @zh 图片格式:ATITC
         */
        ATITC = 7,
        /**
         * @en Image Format:TGA
         * @zh 图片格式:TGA
         */
        TGA = 8,
        /**
         * @en Image Format:RAWDATA
         * @zh 图片格式:RAWDATA
         */
        RAWDATA = 9,
        /**
         * @en Image Format:UNKNOWN
         * @zh 图片格式:UNKNOWN
         */
        UNKNOWN = 10
    }
    export {};
}
declare module "cc/editor/populate-internal-constants" {
    /**
     * This constant is private and used for internal purpose only.
     *
     * If true, some of the constants of `internal:constants` would be also export to the global namespace.
     * For example would set `CC_EDITOR` on `globalThis` as `EDITOR`.
     * This is due to we at present inherits the way how Creator prior to 3.0 deploys the build time constants.
     */
    export const EXPORT_TO_GLOBAL: boolean;
    /**
     * Running in published project.
     */
    export const BUILD: boolean;
    /**
     * Running in the engine's unit test.
     */
    export const TEST: boolean;
    /**
     * Running in the editor.
     */
    export const EDITOR: boolean;
    /**
     * Preview in browser or simulator.
     */
    export const PREVIEW: boolean;
    /**
     * Running in the editor or preview.
     */
    export const DEV: boolean;
    /**
     * Running in the editor or preview, or build in debug mode.
     */
    export const DEBUG: boolean;
    /**
     * Running in native platform (mobile app, desktop app, or simulator).
     */
    export const NATIVE: boolean;
    export const JSB: boolean;
    export const HTML5: boolean;
    /**
     * Running in the Wechat's mini game.
     */
    export const WECHAT: boolean;
    /**
     * Running in the alipay's mini game.
     */
    export const ALIPAY: boolean;
    /**
     * Running in the xiaomi's quick game.
     */
    export const XIAOMI: boolean;
    /**
     * Running in the ByteDance's quick game.
     */
    export const BYTEDANCE: boolean;
    /**
     * Running in the baidu's mini game.
     */
    export const BAIDU: boolean;
    /**
     * Running in the cocosplay.
     */
    export const COCOSPLAY: boolean;
    /**
     * Running in the huawei's quick game.
     */
    export const HUAWEI: boolean;
    /**
     * Running in the oppo's mini game.
     */
    export const OPPO: boolean;
    /**
     * Running in the vivo's mini game.
     */
    export const VIVO: boolean;
    /**
     * Running in the qtt's quick game.
     */
    export const QTT: boolean;
    /**
     * Running in the linksure's quick game.
     */
    export const LINKSURE: boolean;
    /**
     * Running in mini game.
     */
    export const MINIGAME: boolean;
    /**
     * Running in runtime environments.
     */
    export const RUNTIME_BASED: boolean;
    /**
     * Environment support JIT, currently iOS native and mini game doesn't support JIT
     */
    export const SUPPORT_JIT: boolean;
    /**
     * Running in server mode.
     */
    export const SERVER_MODE: boolean;
    export {};
}
declare module "cc/editor/serialization" {
    export class CCON {
        constructor(document: unknown, chunks: Uint8Array[]);
        get document(): unknown;
        get chunks(): Uint8Array[];
    }
    export function encodeCCONJson(ccon: CCON, chunkURLs: string[]): unknown;
    export function encodeCCONBinary(ccon: CCON): Uint8Array;
    export class BufferBuilder {
        get byteLength(): number;
        alignAs(align: number): number;
        append(view: ArrayBufferView): number;
        get(): Uint8Array;
    }
    export function decodeCCONBinary(bytes: Uint8Array): CCON;
    export function parseCCONJson(json: unknown): {
        chunks: string[];
        document: unknown;
    };
    export {};
}
