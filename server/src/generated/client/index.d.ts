
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ResearchSession
 * 
 */
export type ResearchSession = $Result.DefaultSelection<Prisma.$ResearchSessionPayload>
/**
 * Model NodeLog
 * 
 */
export type NodeLog = $Result.DefaultSelection<Prisma.$NodeLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more ResearchSessions
 * const researchSessions = await prisma.researchSession.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more ResearchSessions
   * const researchSessions = await prisma.researchSession.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.researchSession`: Exposes CRUD operations for the **ResearchSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResearchSessions
    * const researchSessions = await prisma.researchSession.findMany()
    * ```
    */
  get researchSession(): Prisma.ResearchSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nodeLog`: Exposes CRUD operations for the **NodeLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NodeLogs
    * const nodeLogs = await prisma.nodeLog.findMany()
    * ```
    */
  get nodeLog(): Prisma.NodeLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ResearchSession: 'ResearchSession',
    NodeLog: 'NodeLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "researchSession" | "nodeLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ResearchSession: {
        payload: Prisma.$ResearchSessionPayload<ExtArgs>
        fields: Prisma.ResearchSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResearchSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResearchSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload>
          }
          findFirst: {
            args: Prisma.ResearchSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResearchSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload>
          }
          findMany: {
            args: Prisma.ResearchSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload>[]
          }
          create: {
            args: Prisma.ResearchSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload>
          }
          createMany: {
            args: Prisma.ResearchSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResearchSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload>[]
          }
          delete: {
            args: Prisma.ResearchSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload>
          }
          update: {
            args: Prisma.ResearchSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload>
          }
          deleteMany: {
            args: Prisma.ResearchSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResearchSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResearchSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload>[]
          }
          upsert: {
            args: Prisma.ResearchSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResearchSessionPayload>
          }
          aggregate: {
            args: Prisma.ResearchSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResearchSession>
          }
          groupBy: {
            args: Prisma.ResearchSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResearchSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResearchSessionCountArgs<ExtArgs>
            result: $Utils.Optional<ResearchSessionCountAggregateOutputType> | number
          }
        }
      }
      NodeLog: {
        payload: Prisma.$NodeLogPayload<ExtArgs>
        fields: Prisma.NodeLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NodeLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NodeLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload>
          }
          findFirst: {
            args: Prisma.NodeLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NodeLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload>
          }
          findMany: {
            args: Prisma.NodeLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload>[]
          }
          create: {
            args: Prisma.NodeLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload>
          }
          createMany: {
            args: Prisma.NodeLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NodeLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload>[]
          }
          delete: {
            args: Prisma.NodeLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload>
          }
          update: {
            args: Prisma.NodeLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload>
          }
          deleteMany: {
            args: Prisma.NodeLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NodeLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NodeLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload>[]
          }
          upsert: {
            args: Prisma.NodeLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodeLogPayload>
          }
          aggregate: {
            args: Prisma.NodeLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNodeLog>
          }
          groupBy: {
            args: Prisma.NodeLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<NodeLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.NodeLogCountArgs<ExtArgs>
            result: $Utils.Optional<NodeLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    researchSession?: ResearchSessionOmit
    nodeLog?: NodeLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ResearchSessionCountOutputType
   */

  export type ResearchSessionCountOutputType = {
    nodeLogs: number
  }

  export type ResearchSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nodeLogs?: boolean | ResearchSessionCountOutputTypeCountNodeLogsArgs
  }

  // Custom InputTypes
  /**
   * ResearchSessionCountOutputType without action
   */
  export type ResearchSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSessionCountOutputType
     */
    select?: ResearchSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResearchSessionCountOutputType without action
   */
  export type ResearchSessionCountOutputTypeCountNodeLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NodeLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ResearchSession
   */

  export type AggregateResearchSession = {
    _count: ResearchSessionCountAggregateOutputType | null
    _avg: ResearchSessionAvgAggregateOutputType | null
    _sum: ResearchSessionSumAggregateOutputType | null
    _min: ResearchSessionMinAggregateOutputType | null
    _max: ResearchSessionMaxAggregateOutputType | null
  }

  export type ResearchSessionAvgAggregateOutputType = {
    compositeScore: number | null
    executionTimeMs: number | null
  }

  export type ResearchSessionSumAggregateOutputType = {
    compositeScore: number | null
    executionTimeMs: number | null
  }

  export type ResearchSessionMinAggregateOutputType = {
    id: string | null
    companyName: string | null
    decision: string | null
    compositeScore: number | null
    riskLevel: string | null
    reasoningSummary: string | null
    executionTimeMs: number | null
    createdAt: Date | null
    updatedAt: Date | null
    browserSessionId: string | null
  }

  export type ResearchSessionMaxAggregateOutputType = {
    id: string | null
    companyName: string | null
    decision: string | null
    compositeScore: number | null
    riskLevel: string | null
    reasoningSummary: string | null
    executionTimeMs: number | null
    createdAt: Date | null
    updatedAt: Date | null
    browserSessionId: string | null
  }

  export type ResearchSessionCountAggregateOutputType = {
    id: number
    companyName: number
    decision: number
    compositeScore: number
    riskLevel: number
    reasoningSummary: number
    quantMetrics: number
    qualMetrics: number
    competitorData: number
    executionTimeMs: number
    createdAt: number
    updatedAt: number
    browserSessionId: number
    _all: number
  }


  export type ResearchSessionAvgAggregateInputType = {
    compositeScore?: true
    executionTimeMs?: true
  }

  export type ResearchSessionSumAggregateInputType = {
    compositeScore?: true
    executionTimeMs?: true
  }

  export type ResearchSessionMinAggregateInputType = {
    id?: true
    companyName?: true
    decision?: true
    compositeScore?: true
    riskLevel?: true
    reasoningSummary?: true
    executionTimeMs?: true
    createdAt?: true
    updatedAt?: true
    browserSessionId?: true
  }

  export type ResearchSessionMaxAggregateInputType = {
    id?: true
    companyName?: true
    decision?: true
    compositeScore?: true
    riskLevel?: true
    reasoningSummary?: true
    executionTimeMs?: true
    createdAt?: true
    updatedAt?: true
    browserSessionId?: true
  }

  export type ResearchSessionCountAggregateInputType = {
    id?: true
    companyName?: true
    decision?: true
    compositeScore?: true
    riskLevel?: true
    reasoningSummary?: true
    quantMetrics?: true
    qualMetrics?: true
    competitorData?: true
    executionTimeMs?: true
    createdAt?: true
    updatedAt?: true
    browserSessionId?: true
    _all?: true
  }

  export type ResearchSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchSession to aggregate.
     */
    where?: ResearchSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchSessions to fetch.
     */
    orderBy?: ResearchSessionOrderByWithRelationInput | ResearchSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResearchSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResearchSessions
    **/
    _count?: true | ResearchSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResearchSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResearchSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResearchSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResearchSessionMaxAggregateInputType
  }

  export type GetResearchSessionAggregateType<T extends ResearchSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateResearchSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResearchSession[P]>
      : GetScalarType<T[P], AggregateResearchSession[P]>
  }




  export type ResearchSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResearchSessionWhereInput
    orderBy?: ResearchSessionOrderByWithAggregationInput | ResearchSessionOrderByWithAggregationInput[]
    by: ResearchSessionScalarFieldEnum[] | ResearchSessionScalarFieldEnum
    having?: ResearchSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResearchSessionCountAggregateInputType | true
    _avg?: ResearchSessionAvgAggregateInputType
    _sum?: ResearchSessionSumAggregateInputType
    _min?: ResearchSessionMinAggregateInputType
    _max?: ResearchSessionMaxAggregateInputType
  }

  export type ResearchSessionGroupByOutputType = {
    id: string
    companyName: string
    decision: string | null
    compositeScore: number | null
    riskLevel: string | null
    reasoningSummary: string | null
    quantMetrics: JsonValue | null
    qualMetrics: JsonValue | null
    competitorData: JsonValue | null
    executionTimeMs: number | null
    createdAt: Date
    updatedAt: Date
    browserSessionId: string | null
    _count: ResearchSessionCountAggregateOutputType | null
    _avg: ResearchSessionAvgAggregateOutputType | null
    _sum: ResearchSessionSumAggregateOutputType | null
    _min: ResearchSessionMinAggregateOutputType | null
    _max: ResearchSessionMaxAggregateOutputType | null
  }

  type GetResearchSessionGroupByPayload<T extends ResearchSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResearchSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResearchSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResearchSessionGroupByOutputType[P]>
            : GetScalarType<T[P], ResearchSessionGroupByOutputType[P]>
        }
      >
    >


  export type ResearchSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    decision?: boolean
    compositeScore?: boolean
    riskLevel?: boolean
    reasoningSummary?: boolean
    quantMetrics?: boolean
    qualMetrics?: boolean
    competitorData?: boolean
    executionTimeMs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    browserSessionId?: boolean
    nodeLogs?: boolean | ResearchSession$nodeLogsArgs<ExtArgs>
    _count?: boolean | ResearchSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["researchSession"]>

  export type ResearchSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    decision?: boolean
    compositeScore?: boolean
    riskLevel?: boolean
    reasoningSummary?: boolean
    quantMetrics?: boolean
    qualMetrics?: boolean
    competitorData?: boolean
    executionTimeMs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    browserSessionId?: boolean
  }, ExtArgs["result"]["researchSession"]>

  export type ResearchSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    decision?: boolean
    compositeScore?: boolean
    riskLevel?: boolean
    reasoningSummary?: boolean
    quantMetrics?: boolean
    qualMetrics?: boolean
    competitorData?: boolean
    executionTimeMs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    browserSessionId?: boolean
  }, ExtArgs["result"]["researchSession"]>

  export type ResearchSessionSelectScalar = {
    id?: boolean
    companyName?: boolean
    decision?: boolean
    compositeScore?: boolean
    riskLevel?: boolean
    reasoningSummary?: boolean
    quantMetrics?: boolean
    qualMetrics?: boolean
    competitorData?: boolean
    executionTimeMs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    browserSessionId?: boolean
  }

  export type ResearchSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyName" | "decision" | "compositeScore" | "riskLevel" | "reasoningSummary" | "quantMetrics" | "qualMetrics" | "competitorData" | "executionTimeMs" | "createdAt" | "updatedAt" | "browserSessionId", ExtArgs["result"]["researchSession"]>
  export type ResearchSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nodeLogs?: boolean | ResearchSession$nodeLogsArgs<ExtArgs>
    _count?: boolean | ResearchSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResearchSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ResearchSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResearchSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResearchSession"
    objects: {
      nodeLogs: Prisma.$NodeLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyName: string
      decision: string | null
      compositeScore: number | null
      riskLevel: string | null
      reasoningSummary: string | null
      quantMetrics: Prisma.JsonValue | null
      qualMetrics: Prisma.JsonValue | null
      competitorData: Prisma.JsonValue | null
      executionTimeMs: number | null
      createdAt: Date
      updatedAt: Date
      browserSessionId: string | null
    }, ExtArgs["result"]["researchSession"]>
    composites: {}
  }

  type ResearchSessionGetPayload<S extends boolean | null | undefined | ResearchSessionDefaultArgs> = $Result.GetResult<Prisma.$ResearchSessionPayload, S>

  type ResearchSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResearchSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResearchSessionCountAggregateInputType | true
    }

  export interface ResearchSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResearchSession'], meta: { name: 'ResearchSession' } }
    /**
     * Find zero or one ResearchSession that matches the filter.
     * @param {ResearchSessionFindUniqueArgs} args - Arguments to find a ResearchSession
     * @example
     * // Get one ResearchSession
     * const researchSession = await prisma.researchSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResearchSessionFindUniqueArgs>(args: SelectSubset<T, ResearchSessionFindUniqueArgs<ExtArgs>>): Prisma__ResearchSessionClient<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResearchSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResearchSessionFindUniqueOrThrowArgs} args - Arguments to find a ResearchSession
     * @example
     * // Get one ResearchSession
     * const researchSession = await prisma.researchSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResearchSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, ResearchSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResearchSessionClient<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResearchSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchSessionFindFirstArgs} args - Arguments to find a ResearchSession
     * @example
     * // Get one ResearchSession
     * const researchSession = await prisma.researchSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResearchSessionFindFirstArgs>(args?: SelectSubset<T, ResearchSessionFindFirstArgs<ExtArgs>>): Prisma__ResearchSessionClient<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResearchSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchSessionFindFirstOrThrowArgs} args - Arguments to find a ResearchSession
     * @example
     * // Get one ResearchSession
     * const researchSession = await prisma.researchSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResearchSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, ResearchSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResearchSessionClient<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResearchSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResearchSessions
     * const researchSessions = await prisma.researchSession.findMany()
     * 
     * // Get first 10 ResearchSessions
     * const researchSessions = await prisma.researchSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const researchSessionWithIdOnly = await prisma.researchSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResearchSessionFindManyArgs>(args?: SelectSubset<T, ResearchSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResearchSession.
     * @param {ResearchSessionCreateArgs} args - Arguments to create a ResearchSession.
     * @example
     * // Create one ResearchSession
     * const ResearchSession = await prisma.researchSession.create({
     *   data: {
     *     // ... data to create a ResearchSession
     *   }
     * })
     * 
     */
    create<T extends ResearchSessionCreateArgs>(args: SelectSubset<T, ResearchSessionCreateArgs<ExtArgs>>): Prisma__ResearchSessionClient<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResearchSessions.
     * @param {ResearchSessionCreateManyArgs} args - Arguments to create many ResearchSessions.
     * @example
     * // Create many ResearchSessions
     * const researchSession = await prisma.researchSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResearchSessionCreateManyArgs>(args?: SelectSubset<T, ResearchSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResearchSessions and returns the data saved in the database.
     * @param {ResearchSessionCreateManyAndReturnArgs} args - Arguments to create many ResearchSessions.
     * @example
     * // Create many ResearchSessions
     * const researchSession = await prisma.researchSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResearchSessions and only return the `id`
     * const researchSessionWithIdOnly = await prisma.researchSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResearchSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, ResearchSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResearchSession.
     * @param {ResearchSessionDeleteArgs} args - Arguments to delete one ResearchSession.
     * @example
     * // Delete one ResearchSession
     * const ResearchSession = await prisma.researchSession.delete({
     *   where: {
     *     // ... filter to delete one ResearchSession
     *   }
     * })
     * 
     */
    delete<T extends ResearchSessionDeleteArgs>(args: SelectSubset<T, ResearchSessionDeleteArgs<ExtArgs>>): Prisma__ResearchSessionClient<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResearchSession.
     * @param {ResearchSessionUpdateArgs} args - Arguments to update one ResearchSession.
     * @example
     * // Update one ResearchSession
     * const researchSession = await prisma.researchSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResearchSessionUpdateArgs>(args: SelectSubset<T, ResearchSessionUpdateArgs<ExtArgs>>): Prisma__ResearchSessionClient<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResearchSessions.
     * @param {ResearchSessionDeleteManyArgs} args - Arguments to filter ResearchSessions to delete.
     * @example
     * // Delete a few ResearchSessions
     * const { count } = await prisma.researchSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResearchSessionDeleteManyArgs>(args?: SelectSubset<T, ResearchSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResearchSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResearchSessions
     * const researchSession = await prisma.researchSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResearchSessionUpdateManyArgs>(args: SelectSubset<T, ResearchSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResearchSessions and returns the data updated in the database.
     * @param {ResearchSessionUpdateManyAndReturnArgs} args - Arguments to update many ResearchSessions.
     * @example
     * // Update many ResearchSessions
     * const researchSession = await prisma.researchSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResearchSessions and only return the `id`
     * const researchSessionWithIdOnly = await prisma.researchSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResearchSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, ResearchSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResearchSession.
     * @param {ResearchSessionUpsertArgs} args - Arguments to update or create a ResearchSession.
     * @example
     * // Update or create a ResearchSession
     * const researchSession = await prisma.researchSession.upsert({
     *   create: {
     *     // ... data to create a ResearchSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResearchSession we want to update
     *   }
     * })
     */
    upsert<T extends ResearchSessionUpsertArgs>(args: SelectSubset<T, ResearchSessionUpsertArgs<ExtArgs>>): Prisma__ResearchSessionClient<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResearchSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchSessionCountArgs} args - Arguments to filter ResearchSessions to count.
     * @example
     * // Count the number of ResearchSessions
     * const count = await prisma.researchSession.count({
     *   where: {
     *     // ... the filter for the ResearchSessions we want to count
     *   }
     * })
    **/
    count<T extends ResearchSessionCountArgs>(
      args?: Subset<T, ResearchSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResearchSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResearchSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResearchSessionAggregateArgs>(args: Subset<T, ResearchSessionAggregateArgs>): Prisma.PrismaPromise<GetResearchSessionAggregateType<T>>

    /**
     * Group by ResearchSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResearchSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResearchSessionGroupByArgs['orderBy'] }
        : { orderBy?: ResearchSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResearchSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResearchSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResearchSession model
   */
  readonly fields: ResearchSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResearchSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResearchSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    nodeLogs<T extends ResearchSession$nodeLogsArgs<ExtArgs> = {}>(args?: Subset<T, ResearchSession$nodeLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResearchSession model
   */
  interface ResearchSessionFieldRefs {
    readonly id: FieldRef<"ResearchSession", 'String'>
    readonly companyName: FieldRef<"ResearchSession", 'String'>
    readonly decision: FieldRef<"ResearchSession", 'String'>
    readonly compositeScore: FieldRef<"ResearchSession", 'Float'>
    readonly riskLevel: FieldRef<"ResearchSession", 'String'>
    readonly reasoningSummary: FieldRef<"ResearchSession", 'String'>
    readonly quantMetrics: FieldRef<"ResearchSession", 'Json'>
    readonly qualMetrics: FieldRef<"ResearchSession", 'Json'>
    readonly competitorData: FieldRef<"ResearchSession", 'Json'>
    readonly executionTimeMs: FieldRef<"ResearchSession", 'Int'>
    readonly createdAt: FieldRef<"ResearchSession", 'DateTime'>
    readonly updatedAt: FieldRef<"ResearchSession", 'DateTime'>
    readonly browserSessionId: FieldRef<"ResearchSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ResearchSession findUnique
   */
  export type ResearchSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchSessionInclude<ExtArgs> | null
    /**
     * Filter, which ResearchSession to fetch.
     */
    where: ResearchSessionWhereUniqueInput
  }

  /**
   * ResearchSession findUniqueOrThrow
   */
  export type ResearchSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchSessionInclude<ExtArgs> | null
    /**
     * Filter, which ResearchSession to fetch.
     */
    where: ResearchSessionWhereUniqueInput
  }

  /**
   * ResearchSession findFirst
   */
  export type ResearchSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchSessionInclude<ExtArgs> | null
    /**
     * Filter, which ResearchSession to fetch.
     */
    where?: ResearchSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchSessions to fetch.
     */
    orderBy?: ResearchSessionOrderByWithRelationInput | ResearchSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResearchSessions.
     */
    cursor?: ResearchSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResearchSessions.
     */
    distinct?: ResearchSessionScalarFieldEnum | ResearchSessionScalarFieldEnum[]
  }

  /**
   * ResearchSession findFirstOrThrow
   */
  export type ResearchSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchSessionInclude<ExtArgs> | null
    /**
     * Filter, which ResearchSession to fetch.
     */
    where?: ResearchSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchSessions to fetch.
     */
    orderBy?: ResearchSessionOrderByWithRelationInput | ResearchSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResearchSessions.
     */
    cursor?: ResearchSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResearchSessions.
     */
    distinct?: ResearchSessionScalarFieldEnum | ResearchSessionScalarFieldEnum[]
  }

  /**
   * ResearchSession findMany
   */
  export type ResearchSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchSessionInclude<ExtArgs> | null
    /**
     * Filter, which ResearchSessions to fetch.
     */
    where?: ResearchSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResearchSessions to fetch.
     */
    orderBy?: ResearchSessionOrderByWithRelationInput | ResearchSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResearchSessions.
     */
    cursor?: ResearchSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResearchSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResearchSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResearchSessions.
     */
    distinct?: ResearchSessionScalarFieldEnum | ResearchSessionScalarFieldEnum[]
  }

  /**
   * ResearchSession create
   */
  export type ResearchSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a ResearchSession.
     */
    data: XOR<ResearchSessionCreateInput, ResearchSessionUncheckedCreateInput>
  }

  /**
   * ResearchSession createMany
   */
  export type ResearchSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResearchSessions.
     */
    data: ResearchSessionCreateManyInput | ResearchSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResearchSession createManyAndReturn
   */
  export type ResearchSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * The data used to create many ResearchSessions.
     */
    data: ResearchSessionCreateManyInput | ResearchSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResearchSession update
   */
  export type ResearchSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a ResearchSession.
     */
    data: XOR<ResearchSessionUpdateInput, ResearchSessionUncheckedUpdateInput>
    /**
     * Choose, which ResearchSession to update.
     */
    where: ResearchSessionWhereUniqueInput
  }

  /**
   * ResearchSession updateMany
   */
  export type ResearchSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResearchSessions.
     */
    data: XOR<ResearchSessionUpdateManyMutationInput, ResearchSessionUncheckedUpdateManyInput>
    /**
     * Filter which ResearchSessions to update
     */
    where?: ResearchSessionWhereInput
    /**
     * Limit how many ResearchSessions to update.
     */
    limit?: number
  }

  /**
   * ResearchSession updateManyAndReturn
   */
  export type ResearchSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * The data used to update ResearchSessions.
     */
    data: XOR<ResearchSessionUpdateManyMutationInput, ResearchSessionUncheckedUpdateManyInput>
    /**
     * Filter which ResearchSessions to update
     */
    where?: ResearchSessionWhereInput
    /**
     * Limit how many ResearchSessions to update.
     */
    limit?: number
  }

  /**
   * ResearchSession upsert
   */
  export type ResearchSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the ResearchSession to update in case it exists.
     */
    where: ResearchSessionWhereUniqueInput
    /**
     * In case the ResearchSession found by the `where` argument doesn't exist, create a new ResearchSession with this data.
     */
    create: XOR<ResearchSessionCreateInput, ResearchSessionUncheckedCreateInput>
    /**
     * In case the ResearchSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResearchSessionUpdateInput, ResearchSessionUncheckedUpdateInput>
  }

  /**
   * ResearchSession delete
   */
  export type ResearchSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchSessionInclude<ExtArgs> | null
    /**
     * Filter which ResearchSession to delete.
     */
    where: ResearchSessionWhereUniqueInput
  }

  /**
   * ResearchSession deleteMany
   */
  export type ResearchSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchSessions to delete
     */
    where?: ResearchSessionWhereInput
    /**
     * Limit how many ResearchSessions to delete.
     */
    limit?: number
  }

  /**
   * ResearchSession.nodeLogs
   */
  export type ResearchSession$nodeLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
    where?: NodeLogWhereInput
    orderBy?: NodeLogOrderByWithRelationInput | NodeLogOrderByWithRelationInput[]
    cursor?: NodeLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NodeLogScalarFieldEnum | NodeLogScalarFieldEnum[]
  }

  /**
   * ResearchSession without action
   */
  export type ResearchSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: ResearchSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: ResearchSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResearchSessionInclude<ExtArgs> | null
  }


  /**
   * Model NodeLog
   */

  export type AggregateNodeLog = {
    _count: NodeLogCountAggregateOutputType | null
    _avg: NodeLogAvgAggregateOutputType | null
    _sum: NodeLogSumAggregateOutputType | null
    _min: NodeLogMinAggregateOutputType | null
    _max: NodeLogMaxAggregateOutputType | null
  }

  export type NodeLogAvgAggregateOutputType = {
    durationMs: number | null
  }

  export type NodeLogSumAggregateOutputType = {
    durationMs: number | null
  }

  export type NodeLogMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    nodeName: string | null
    status: string | null
    durationMs: number | null
    createdAt: Date | null
  }

  export type NodeLogMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    nodeName: string | null
    status: string | null
    durationMs: number | null
    createdAt: Date | null
  }

  export type NodeLogCountAggregateOutputType = {
    id: number
    sessionId: number
    nodeName: number
    status: number
    payload: number
    durationMs: number
    createdAt: number
    _all: number
  }


  export type NodeLogAvgAggregateInputType = {
    durationMs?: true
  }

  export type NodeLogSumAggregateInputType = {
    durationMs?: true
  }

  export type NodeLogMinAggregateInputType = {
    id?: true
    sessionId?: true
    nodeName?: true
    status?: true
    durationMs?: true
    createdAt?: true
  }

  export type NodeLogMaxAggregateInputType = {
    id?: true
    sessionId?: true
    nodeName?: true
    status?: true
    durationMs?: true
    createdAt?: true
  }

  export type NodeLogCountAggregateInputType = {
    id?: true
    sessionId?: true
    nodeName?: true
    status?: true
    payload?: true
    durationMs?: true
    createdAt?: true
    _all?: true
  }

  export type NodeLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NodeLog to aggregate.
     */
    where?: NodeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NodeLogs to fetch.
     */
    orderBy?: NodeLogOrderByWithRelationInput | NodeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NodeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NodeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NodeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NodeLogs
    **/
    _count?: true | NodeLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NodeLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NodeLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NodeLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NodeLogMaxAggregateInputType
  }

  export type GetNodeLogAggregateType<T extends NodeLogAggregateArgs> = {
        [P in keyof T & keyof AggregateNodeLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNodeLog[P]>
      : GetScalarType<T[P], AggregateNodeLog[P]>
  }




  export type NodeLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NodeLogWhereInput
    orderBy?: NodeLogOrderByWithAggregationInput | NodeLogOrderByWithAggregationInput[]
    by: NodeLogScalarFieldEnum[] | NodeLogScalarFieldEnum
    having?: NodeLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NodeLogCountAggregateInputType | true
    _avg?: NodeLogAvgAggregateInputType
    _sum?: NodeLogSumAggregateInputType
    _min?: NodeLogMinAggregateInputType
    _max?: NodeLogMaxAggregateInputType
  }

  export type NodeLogGroupByOutputType = {
    id: string
    sessionId: string
    nodeName: string
    status: string
    payload: JsonValue | null
    durationMs: number | null
    createdAt: Date
    _count: NodeLogCountAggregateOutputType | null
    _avg: NodeLogAvgAggregateOutputType | null
    _sum: NodeLogSumAggregateOutputType | null
    _min: NodeLogMinAggregateOutputType | null
    _max: NodeLogMaxAggregateOutputType | null
  }

  type GetNodeLogGroupByPayload<T extends NodeLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NodeLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NodeLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NodeLogGroupByOutputType[P]>
            : GetScalarType<T[P], NodeLogGroupByOutputType[P]>
        }
      >
    >


  export type NodeLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    nodeName?: boolean
    status?: boolean
    payload?: boolean
    durationMs?: boolean
    createdAt?: boolean
    session?: boolean | ResearchSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nodeLog"]>

  export type NodeLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    nodeName?: boolean
    status?: boolean
    payload?: boolean
    durationMs?: boolean
    createdAt?: boolean
    session?: boolean | ResearchSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nodeLog"]>

  export type NodeLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    nodeName?: boolean
    status?: boolean
    payload?: boolean
    durationMs?: boolean
    createdAt?: boolean
    session?: boolean | ResearchSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["nodeLog"]>

  export type NodeLogSelectScalar = {
    id?: boolean
    sessionId?: boolean
    nodeName?: boolean
    status?: boolean
    payload?: boolean
    durationMs?: boolean
    createdAt?: boolean
  }

  export type NodeLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "nodeName" | "status" | "payload" | "durationMs" | "createdAt", ExtArgs["result"]["nodeLog"]>
  export type NodeLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ResearchSessionDefaultArgs<ExtArgs>
  }
  export type NodeLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ResearchSessionDefaultArgs<ExtArgs>
  }
  export type NodeLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ResearchSessionDefaultArgs<ExtArgs>
  }

  export type $NodeLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NodeLog"
    objects: {
      session: Prisma.$ResearchSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      nodeName: string
      status: string
      payload: Prisma.JsonValue | null
      durationMs: number | null
      createdAt: Date
    }, ExtArgs["result"]["nodeLog"]>
    composites: {}
  }

  type NodeLogGetPayload<S extends boolean | null | undefined | NodeLogDefaultArgs> = $Result.GetResult<Prisma.$NodeLogPayload, S>

  type NodeLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NodeLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NodeLogCountAggregateInputType | true
    }

  export interface NodeLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NodeLog'], meta: { name: 'NodeLog' } }
    /**
     * Find zero or one NodeLog that matches the filter.
     * @param {NodeLogFindUniqueArgs} args - Arguments to find a NodeLog
     * @example
     * // Get one NodeLog
     * const nodeLog = await prisma.nodeLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NodeLogFindUniqueArgs>(args: SelectSubset<T, NodeLogFindUniqueArgs<ExtArgs>>): Prisma__NodeLogClient<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NodeLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NodeLogFindUniqueOrThrowArgs} args - Arguments to find a NodeLog
     * @example
     * // Get one NodeLog
     * const nodeLog = await prisma.nodeLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NodeLogFindUniqueOrThrowArgs>(args: SelectSubset<T, NodeLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NodeLogClient<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NodeLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeLogFindFirstArgs} args - Arguments to find a NodeLog
     * @example
     * // Get one NodeLog
     * const nodeLog = await prisma.nodeLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NodeLogFindFirstArgs>(args?: SelectSubset<T, NodeLogFindFirstArgs<ExtArgs>>): Prisma__NodeLogClient<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NodeLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeLogFindFirstOrThrowArgs} args - Arguments to find a NodeLog
     * @example
     * // Get one NodeLog
     * const nodeLog = await prisma.nodeLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NodeLogFindFirstOrThrowArgs>(args?: SelectSubset<T, NodeLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__NodeLogClient<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NodeLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NodeLogs
     * const nodeLogs = await prisma.nodeLog.findMany()
     * 
     * // Get first 10 NodeLogs
     * const nodeLogs = await prisma.nodeLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nodeLogWithIdOnly = await prisma.nodeLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NodeLogFindManyArgs>(args?: SelectSubset<T, NodeLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NodeLog.
     * @param {NodeLogCreateArgs} args - Arguments to create a NodeLog.
     * @example
     * // Create one NodeLog
     * const NodeLog = await prisma.nodeLog.create({
     *   data: {
     *     // ... data to create a NodeLog
     *   }
     * })
     * 
     */
    create<T extends NodeLogCreateArgs>(args: SelectSubset<T, NodeLogCreateArgs<ExtArgs>>): Prisma__NodeLogClient<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NodeLogs.
     * @param {NodeLogCreateManyArgs} args - Arguments to create many NodeLogs.
     * @example
     * // Create many NodeLogs
     * const nodeLog = await prisma.nodeLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NodeLogCreateManyArgs>(args?: SelectSubset<T, NodeLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NodeLogs and returns the data saved in the database.
     * @param {NodeLogCreateManyAndReturnArgs} args - Arguments to create many NodeLogs.
     * @example
     * // Create many NodeLogs
     * const nodeLog = await prisma.nodeLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NodeLogs and only return the `id`
     * const nodeLogWithIdOnly = await prisma.nodeLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NodeLogCreateManyAndReturnArgs>(args?: SelectSubset<T, NodeLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NodeLog.
     * @param {NodeLogDeleteArgs} args - Arguments to delete one NodeLog.
     * @example
     * // Delete one NodeLog
     * const NodeLog = await prisma.nodeLog.delete({
     *   where: {
     *     // ... filter to delete one NodeLog
     *   }
     * })
     * 
     */
    delete<T extends NodeLogDeleteArgs>(args: SelectSubset<T, NodeLogDeleteArgs<ExtArgs>>): Prisma__NodeLogClient<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NodeLog.
     * @param {NodeLogUpdateArgs} args - Arguments to update one NodeLog.
     * @example
     * // Update one NodeLog
     * const nodeLog = await prisma.nodeLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NodeLogUpdateArgs>(args: SelectSubset<T, NodeLogUpdateArgs<ExtArgs>>): Prisma__NodeLogClient<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NodeLogs.
     * @param {NodeLogDeleteManyArgs} args - Arguments to filter NodeLogs to delete.
     * @example
     * // Delete a few NodeLogs
     * const { count } = await prisma.nodeLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NodeLogDeleteManyArgs>(args?: SelectSubset<T, NodeLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NodeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NodeLogs
     * const nodeLog = await prisma.nodeLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NodeLogUpdateManyArgs>(args: SelectSubset<T, NodeLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NodeLogs and returns the data updated in the database.
     * @param {NodeLogUpdateManyAndReturnArgs} args - Arguments to update many NodeLogs.
     * @example
     * // Update many NodeLogs
     * const nodeLog = await prisma.nodeLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NodeLogs and only return the `id`
     * const nodeLogWithIdOnly = await prisma.nodeLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NodeLogUpdateManyAndReturnArgs>(args: SelectSubset<T, NodeLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NodeLog.
     * @param {NodeLogUpsertArgs} args - Arguments to update or create a NodeLog.
     * @example
     * // Update or create a NodeLog
     * const nodeLog = await prisma.nodeLog.upsert({
     *   create: {
     *     // ... data to create a NodeLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NodeLog we want to update
     *   }
     * })
     */
    upsert<T extends NodeLogUpsertArgs>(args: SelectSubset<T, NodeLogUpsertArgs<ExtArgs>>): Prisma__NodeLogClient<$Result.GetResult<Prisma.$NodeLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NodeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeLogCountArgs} args - Arguments to filter NodeLogs to count.
     * @example
     * // Count the number of NodeLogs
     * const count = await prisma.nodeLog.count({
     *   where: {
     *     // ... the filter for the NodeLogs we want to count
     *   }
     * })
    **/
    count<T extends NodeLogCountArgs>(
      args?: Subset<T, NodeLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NodeLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NodeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NodeLogAggregateArgs>(args: Subset<T, NodeLogAggregateArgs>): Prisma.PrismaPromise<GetNodeLogAggregateType<T>>

    /**
     * Group by NodeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NodeLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NodeLogGroupByArgs['orderBy'] }
        : { orderBy?: NodeLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NodeLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNodeLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NodeLog model
   */
  readonly fields: NodeLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NodeLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NodeLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends ResearchSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ResearchSessionDefaultArgs<ExtArgs>>): Prisma__ResearchSessionClient<$Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NodeLog model
   */
  interface NodeLogFieldRefs {
    readonly id: FieldRef<"NodeLog", 'String'>
    readonly sessionId: FieldRef<"NodeLog", 'String'>
    readonly nodeName: FieldRef<"NodeLog", 'String'>
    readonly status: FieldRef<"NodeLog", 'String'>
    readonly payload: FieldRef<"NodeLog", 'Json'>
    readonly durationMs: FieldRef<"NodeLog", 'Int'>
    readonly createdAt: FieldRef<"NodeLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NodeLog findUnique
   */
  export type NodeLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
    /**
     * Filter, which NodeLog to fetch.
     */
    where: NodeLogWhereUniqueInput
  }

  /**
   * NodeLog findUniqueOrThrow
   */
  export type NodeLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
    /**
     * Filter, which NodeLog to fetch.
     */
    where: NodeLogWhereUniqueInput
  }

  /**
   * NodeLog findFirst
   */
  export type NodeLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
    /**
     * Filter, which NodeLog to fetch.
     */
    where?: NodeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NodeLogs to fetch.
     */
    orderBy?: NodeLogOrderByWithRelationInput | NodeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NodeLogs.
     */
    cursor?: NodeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NodeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NodeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NodeLogs.
     */
    distinct?: NodeLogScalarFieldEnum | NodeLogScalarFieldEnum[]
  }

  /**
   * NodeLog findFirstOrThrow
   */
  export type NodeLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
    /**
     * Filter, which NodeLog to fetch.
     */
    where?: NodeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NodeLogs to fetch.
     */
    orderBy?: NodeLogOrderByWithRelationInput | NodeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NodeLogs.
     */
    cursor?: NodeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NodeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NodeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NodeLogs.
     */
    distinct?: NodeLogScalarFieldEnum | NodeLogScalarFieldEnum[]
  }

  /**
   * NodeLog findMany
   */
  export type NodeLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
    /**
     * Filter, which NodeLogs to fetch.
     */
    where?: NodeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NodeLogs to fetch.
     */
    orderBy?: NodeLogOrderByWithRelationInput | NodeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NodeLogs.
     */
    cursor?: NodeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NodeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NodeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NodeLogs.
     */
    distinct?: NodeLogScalarFieldEnum | NodeLogScalarFieldEnum[]
  }

  /**
   * NodeLog create
   */
  export type NodeLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
    /**
     * The data needed to create a NodeLog.
     */
    data: XOR<NodeLogCreateInput, NodeLogUncheckedCreateInput>
  }

  /**
   * NodeLog createMany
   */
  export type NodeLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NodeLogs.
     */
    data: NodeLogCreateManyInput | NodeLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NodeLog createManyAndReturn
   */
  export type NodeLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * The data used to create many NodeLogs.
     */
    data: NodeLogCreateManyInput | NodeLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NodeLog update
   */
  export type NodeLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
    /**
     * The data needed to update a NodeLog.
     */
    data: XOR<NodeLogUpdateInput, NodeLogUncheckedUpdateInput>
    /**
     * Choose, which NodeLog to update.
     */
    where: NodeLogWhereUniqueInput
  }

  /**
   * NodeLog updateMany
   */
  export type NodeLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NodeLogs.
     */
    data: XOR<NodeLogUpdateManyMutationInput, NodeLogUncheckedUpdateManyInput>
    /**
     * Filter which NodeLogs to update
     */
    where?: NodeLogWhereInput
    /**
     * Limit how many NodeLogs to update.
     */
    limit?: number
  }

  /**
   * NodeLog updateManyAndReturn
   */
  export type NodeLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * The data used to update NodeLogs.
     */
    data: XOR<NodeLogUpdateManyMutationInput, NodeLogUncheckedUpdateManyInput>
    /**
     * Filter which NodeLogs to update
     */
    where?: NodeLogWhereInput
    /**
     * Limit how many NodeLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NodeLog upsert
   */
  export type NodeLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
    /**
     * The filter to search for the NodeLog to update in case it exists.
     */
    where: NodeLogWhereUniqueInput
    /**
     * In case the NodeLog found by the `where` argument doesn't exist, create a new NodeLog with this data.
     */
    create: XOR<NodeLogCreateInput, NodeLogUncheckedCreateInput>
    /**
     * In case the NodeLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NodeLogUpdateInput, NodeLogUncheckedUpdateInput>
  }

  /**
   * NodeLog delete
   */
  export type NodeLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
    /**
     * Filter which NodeLog to delete.
     */
    where: NodeLogWhereUniqueInput
  }

  /**
   * NodeLog deleteMany
   */
  export type NodeLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NodeLogs to delete
     */
    where?: NodeLogWhereInput
    /**
     * Limit how many NodeLogs to delete.
     */
    limit?: number
  }

  /**
   * NodeLog without action
   */
  export type NodeLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeLog
     */
    select?: NodeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NodeLog
     */
    omit?: NodeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ResearchSessionScalarFieldEnum: {
    id: 'id',
    companyName: 'companyName',
    decision: 'decision',
    compositeScore: 'compositeScore',
    riskLevel: 'riskLevel',
    reasoningSummary: 'reasoningSummary',
    quantMetrics: 'quantMetrics',
    qualMetrics: 'qualMetrics',
    competitorData: 'competitorData',
    executionTimeMs: 'executionTimeMs',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    browserSessionId: 'browserSessionId'
  };

  export type ResearchSessionScalarFieldEnum = (typeof ResearchSessionScalarFieldEnum)[keyof typeof ResearchSessionScalarFieldEnum]


  export const NodeLogScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    nodeName: 'nodeName',
    status: 'status',
    payload: 'payload',
    durationMs: 'durationMs',
    createdAt: 'createdAt'
  };

  export type NodeLogScalarFieldEnum = (typeof NodeLogScalarFieldEnum)[keyof typeof NodeLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type ResearchSessionWhereInput = {
    AND?: ResearchSessionWhereInput | ResearchSessionWhereInput[]
    OR?: ResearchSessionWhereInput[]
    NOT?: ResearchSessionWhereInput | ResearchSessionWhereInput[]
    id?: StringFilter<"ResearchSession"> | string
    companyName?: StringFilter<"ResearchSession"> | string
    decision?: StringNullableFilter<"ResearchSession"> | string | null
    compositeScore?: FloatNullableFilter<"ResearchSession"> | number | null
    riskLevel?: StringNullableFilter<"ResearchSession"> | string | null
    reasoningSummary?: StringNullableFilter<"ResearchSession"> | string | null
    quantMetrics?: JsonNullableFilter<"ResearchSession">
    qualMetrics?: JsonNullableFilter<"ResearchSession">
    competitorData?: JsonNullableFilter<"ResearchSession">
    executionTimeMs?: IntNullableFilter<"ResearchSession"> | number | null
    createdAt?: DateTimeFilter<"ResearchSession"> | Date | string
    updatedAt?: DateTimeFilter<"ResearchSession"> | Date | string
    browserSessionId?: StringNullableFilter<"ResearchSession"> | string | null
    nodeLogs?: NodeLogListRelationFilter
  }

  export type ResearchSessionOrderByWithRelationInput = {
    id?: SortOrder
    companyName?: SortOrder
    decision?: SortOrderInput | SortOrder
    compositeScore?: SortOrderInput | SortOrder
    riskLevel?: SortOrderInput | SortOrder
    reasoningSummary?: SortOrderInput | SortOrder
    quantMetrics?: SortOrderInput | SortOrder
    qualMetrics?: SortOrderInput | SortOrder
    competitorData?: SortOrderInput | SortOrder
    executionTimeMs?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    browserSessionId?: SortOrderInput | SortOrder
    nodeLogs?: NodeLogOrderByRelationAggregateInput
  }

  export type ResearchSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResearchSessionWhereInput | ResearchSessionWhereInput[]
    OR?: ResearchSessionWhereInput[]
    NOT?: ResearchSessionWhereInput | ResearchSessionWhereInput[]
    companyName?: StringFilter<"ResearchSession"> | string
    decision?: StringNullableFilter<"ResearchSession"> | string | null
    compositeScore?: FloatNullableFilter<"ResearchSession"> | number | null
    riskLevel?: StringNullableFilter<"ResearchSession"> | string | null
    reasoningSummary?: StringNullableFilter<"ResearchSession"> | string | null
    quantMetrics?: JsonNullableFilter<"ResearchSession">
    qualMetrics?: JsonNullableFilter<"ResearchSession">
    competitorData?: JsonNullableFilter<"ResearchSession">
    executionTimeMs?: IntNullableFilter<"ResearchSession"> | number | null
    createdAt?: DateTimeFilter<"ResearchSession"> | Date | string
    updatedAt?: DateTimeFilter<"ResearchSession"> | Date | string
    browserSessionId?: StringNullableFilter<"ResearchSession"> | string | null
    nodeLogs?: NodeLogListRelationFilter
  }, "id">

  export type ResearchSessionOrderByWithAggregationInput = {
    id?: SortOrder
    companyName?: SortOrder
    decision?: SortOrderInput | SortOrder
    compositeScore?: SortOrderInput | SortOrder
    riskLevel?: SortOrderInput | SortOrder
    reasoningSummary?: SortOrderInput | SortOrder
    quantMetrics?: SortOrderInput | SortOrder
    qualMetrics?: SortOrderInput | SortOrder
    competitorData?: SortOrderInput | SortOrder
    executionTimeMs?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    browserSessionId?: SortOrderInput | SortOrder
    _count?: ResearchSessionCountOrderByAggregateInput
    _avg?: ResearchSessionAvgOrderByAggregateInput
    _max?: ResearchSessionMaxOrderByAggregateInput
    _min?: ResearchSessionMinOrderByAggregateInput
    _sum?: ResearchSessionSumOrderByAggregateInput
  }

  export type ResearchSessionScalarWhereWithAggregatesInput = {
    AND?: ResearchSessionScalarWhereWithAggregatesInput | ResearchSessionScalarWhereWithAggregatesInput[]
    OR?: ResearchSessionScalarWhereWithAggregatesInput[]
    NOT?: ResearchSessionScalarWhereWithAggregatesInput | ResearchSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ResearchSession"> | string
    companyName?: StringWithAggregatesFilter<"ResearchSession"> | string
    decision?: StringNullableWithAggregatesFilter<"ResearchSession"> | string | null
    compositeScore?: FloatNullableWithAggregatesFilter<"ResearchSession"> | number | null
    riskLevel?: StringNullableWithAggregatesFilter<"ResearchSession"> | string | null
    reasoningSummary?: StringNullableWithAggregatesFilter<"ResearchSession"> | string | null
    quantMetrics?: JsonNullableWithAggregatesFilter<"ResearchSession">
    qualMetrics?: JsonNullableWithAggregatesFilter<"ResearchSession">
    competitorData?: JsonNullableWithAggregatesFilter<"ResearchSession">
    executionTimeMs?: IntNullableWithAggregatesFilter<"ResearchSession"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ResearchSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ResearchSession"> | Date | string
    browserSessionId?: StringNullableWithAggregatesFilter<"ResearchSession"> | string | null
  }

  export type NodeLogWhereInput = {
    AND?: NodeLogWhereInput | NodeLogWhereInput[]
    OR?: NodeLogWhereInput[]
    NOT?: NodeLogWhereInput | NodeLogWhereInput[]
    id?: StringFilter<"NodeLog"> | string
    sessionId?: StringFilter<"NodeLog"> | string
    nodeName?: StringFilter<"NodeLog"> | string
    status?: StringFilter<"NodeLog"> | string
    payload?: JsonNullableFilter<"NodeLog">
    durationMs?: IntNullableFilter<"NodeLog"> | number | null
    createdAt?: DateTimeFilter<"NodeLog"> | Date | string
    session?: XOR<ResearchSessionScalarRelationFilter, ResearchSessionWhereInput>
  }

  export type NodeLogOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    nodeName?: SortOrder
    status?: SortOrder
    payload?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: ResearchSessionOrderByWithRelationInput
  }

  export type NodeLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NodeLogWhereInput | NodeLogWhereInput[]
    OR?: NodeLogWhereInput[]
    NOT?: NodeLogWhereInput | NodeLogWhereInput[]
    sessionId?: StringFilter<"NodeLog"> | string
    nodeName?: StringFilter<"NodeLog"> | string
    status?: StringFilter<"NodeLog"> | string
    payload?: JsonNullableFilter<"NodeLog">
    durationMs?: IntNullableFilter<"NodeLog"> | number | null
    createdAt?: DateTimeFilter<"NodeLog"> | Date | string
    session?: XOR<ResearchSessionScalarRelationFilter, ResearchSessionWhereInput>
  }, "id">

  export type NodeLogOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    nodeName?: SortOrder
    status?: SortOrder
    payload?: SortOrderInput | SortOrder
    durationMs?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NodeLogCountOrderByAggregateInput
    _avg?: NodeLogAvgOrderByAggregateInput
    _max?: NodeLogMaxOrderByAggregateInput
    _min?: NodeLogMinOrderByAggregateInput
    _sum?: NodeLogSumOrderByAggregateInput
  }

  export type NodeLogScalarWhereWithAggregatesInput = {
    AND?: NodeLogScalarWhereWithAggregatesInput | NodeLogScalarWhereWithAggregatesInput[]
    OR?: NodeLogScalarWhereWithAggregatesInput[]
    NOT?: NodeLogScalarWhereWithAggregatesInput | NodeLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NodeLog"> | string
    sessionId?: StringWithAggregatesFilter<"NodeLog"> | string
    nodeName?: StringWithAggregatesFilter<"NodeLog"> | string
    status?: StringWithAggregatesFilter<"NodeLog"> | string
    payload?: JsonNullableWithAggregatesFilter<"NodeLog">
    durationMs?: IntNullableWithAggregatesFilter<"NodeLog"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"NodeLog"> | Date | string
  }

  export type ResearchSessionCreateInput = {
    id?: string
    companyName: string
    decision?: string | null
    compositeScore?: number | null
    riskLevel?: string | null
    reasoningSummary?: string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    browserSessionId?: string | null
    nodeLogs?: NodeLogCreateNestedManyWithoutSessionInput
  }

  export type ResearchSessionUncheckedCreateInput = {
    id?: string
    companyName: string
    decision?: string | null
    compositeScore?: number | null
    riskLevel?: string | null
    reasoningSummary?: string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    browserSessionId?: string | null
    nodeLogs?: NodeLogUncheckedCreateNestedManyWithoutSessionInput
  }

  export type ResearchSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    compositeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    reasoningSummary?: NullableStringFieldUpdateOperationsInput | string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    browserSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    nodeLogs?: NodeLogUpdateManyWithoutSessionNestedInput
  }

  export type ResearchSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    compositeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    reasoningSummary?: NullableStringFieldUpdateOperationsInput | string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    browserSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    nodeLogs?: NodeLogUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type ResearchSessionCreateManyInput = {
    id?: string
    companyName: string
    decision?: string | null
    compositeScore?: number | null
    riskLevel?: string | null
    reasoningSummary?: string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    browserSessionId?: string | null
  }

  export type ResearchSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    compositeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    reasoningSummary?: NullableStringFieldUpdateOperationsInput | string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    browserSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResearchSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    compositeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    reasoningSummary?: NullableStringFieldUpdateOperationsInput | string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    browserSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NodeLogCreateInput = {
    id?: string
    nodeName: string
    status: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: number | null
    createdAt?: Date | string
    session: ResearchSessionCreateNestedOneWithoutNodeLogsInput
  }

  export type NodeLogUncheckedCreateInput = {
    id?: string
    sessionId: string
    nodeName: string
    status: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: number | null
    createdAt?: Date | string
  }

  export type NodeLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: ResearchSessionUpdateOneRequiredWithoutNodeLogsNestedInput
  }

  export type NodeLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NodeLogCreateManyInput = {
    id?: string
    sessionId: string
    nodeName: string
    status: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: number | null
    createdAt?: Date | string
  }

  export type NodeLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NodeLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NodeLogListRelationFilter = {
    every?: NodeLogWhereInput
    some?: NodeLogWhereInput
    none?: NodeLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NodeLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResearchSessionCountOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    decision?: SortOrder
    compositeScore?: SortOrder
    riskLevel?: SortOrder
    reasoningSummary?: SortOrder
    quantMetrics?: SortOrder
    qualMetrics?: SortOrder
    competitorData?: SortOrder
    executionTimeMs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    browserSessionId?: SortOrder
  }

  export type ResearchSessionAvgOrderByAggregateInput = {
    compositeScore?: SortOrder
    executionTimeMs?: SortOrder
  }

  export type ResearchSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    decision?: SortOrder
    compositeScore?: SortOrder
    riskLevel?: SortOrder
    reasoningSummary?: SortOrder
    executionTimeMs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    browserSessionId?: SortOrder
  }

  export type ResearchSessionMinOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    decision?: SortOrder
    compositeScore?: SortOrder
    riskLevel?: SortOrder
    reasoningSummary?: SortOrder
    executionTimeMs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    browserSessionId?: SortOrder
  }

  export type ResearchSessionSumOrderByAggregateInput = {
    compositeScore?: SortOrder
    executionTimeMs?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ResearchSessionScalarRelationFilter = {
    is?: ResearchSessionWhereInput
    isNot?: ResearchSessionWhereInput
  }

  export type NodeLogCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    nodeName?: SortOrder
    status?: SortOrder
    payload?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type NodeLogAvgOrderByAggregateInput = {
    durationMs?: SortOrder
  }

  export type NodeLogMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    nodeName?: SortOrder
    status?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type NodeLogMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    nodeName?: SortOrder
    status?: SortOrder
    durationMs?: SortOrder
    createdAt?: SortOrder
  }

  export type NodeLogSumOrderByAggregateInput = {
    durationMs?: SortOrder
  }

  export type NodeLogCreateNestedManyWithoutSessionInput = {
    create?: XOR<NodeLogCreateWithoutSessionInput, NodeLogUncheckedCreateWithoutSessionInput> | NodeLogCreateWithoutSessionInput[] | NodeLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: NodeLogCreateOrConnectWithoutSessionInput | NodeLogCreateOrConnectWithoutSessionInput[]
    createMany?: NodeLogCreateManySessionInputEnvelope
    connect?: NodeLogWhereUniqueInput | NodeLogWhereUniqueInput[]
  }

  export type NodeLogUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<NodeLogCreateWithoutSessionInput, NodeLogUncheckedCreateWithoutSessionInput> | NodeLogCreateWithoutSessionInput[] | NodeLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: NodeLogCreateOrConnectWithoutSessionInput | NodeLogCreateOrConnectWithoutSessionInput[]
    createMany?: NodeLogCreateManySessionInputEnvelope
    connect?: NodeLogWhereUniqueInput | NodeLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NodeLogUpdateManyWithoutSessionNestedInput = {
    create?: XOR<NodeLogCreateWithoutSessionInput, NodeLogUncheckedCreateWithoutSessionInput> | NodeLogCreateWithoutSessionInput[] | NodeLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: NodeLogCreateOrConnectWithoutSessionInput | NodeLogCreateOrConnectWithoutSessionInput[]
    upsert?: NodeLogUpsertWithWhereUniqueWithoutSessionInput | NodeLogUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: NodeLogCreateManySessionInputEnvelope
    set?: NodeLogWhereUniqueInput | NodeLogWhereUniqueInput[]
    disconnect?: NodeLogWhereUniqueInput | NodeLogWhereUniqueInput[]
    delete?: NodeLogWhereUniqueInput | NodeLogWhereUniqueInput[]
    connect?: NodeLogWhereUniqueInput | NodeLogWhereUniqueInput[]
    update?: NodeLogUpdateWithWhereUniqueWithoutSessionInput | NodeLogUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: NodeLogUpdateManyWithWhereWithoutSessionInput | NodeLogUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: NodeLogScalarWhereInput | NodeLogScalarWhereInput[]
  }

  export type NodeLogUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<NodeLogCreateWithoutSessionInput, NodeLogUncheckedCreateWithoutSessionInput> | NodeLogCreateWithoutSessionInput[] | NodeLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: NodeLogCreateOrConnectWithoutSessionInput | NodeLogCreateOrConnectWithoutSessionInput[]
    upsert?: NodeLogUpsertWithWhereUniqueWithoutSessionInput | NodeLogUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: NodeLogCreateManySessionInputEnvelope
    set?: NodeLogWhereUniqueInput | NodeLogWhereUniqueInput[]
    disconnect?: NodeLogWhereUniqueInput | NodeLogWhereUniqueInput[]
    delete?: NodeLogWhereUniqueInput | NodeLogWhereUniqueInput[]
    connect?: NodeLogWhereUniqueInput | NodeLogWhereUniqueInput[]
    update?: NodeLogUpdateWithWhereUniqueWithoutSessionInput | NodeLogUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: NodeLogUpdateManyWithWhereWithoutSessionInput | NodeLogUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: NodeLogScalarWhereInput | NodeLogScalarWhereInput[]
  }

  export type ResearchSessionCreateNestedOneWithoutNodeLogsInput = {
    create?: XOR<ResearchSessionCreateWithoutNodeLogsInput, ResearchSessionUncheckedCreateWithoutNodeLogsInput>
    connectOrCreate?: ResearchSessionCreateOrConnectWithoutNodeLogsInput
    connect?: ResearchSessionWhereUniqueInput
  }

  export type ResearchSessionUpdateOneRequiredWithoutNodeLogsNestedInput = {
    create?: XOR<ResearchSessionCreateWithoutNodeLogsInput, ResearchSessionUncheckedCreateWithoutNodeLogsInput>
    connectOrCreate?: ResearchSessionCreateOrConnectWithoutNodeLogsInput
    upsert?: ResearchSessionUpsertWithoutNodeLogsInput
    connect?: ResearchSessionWhereUniqueInput
    update?: XOR<XOR<ResearchSessionUpdateToOneWithWhereWithoutNodeLogsInput, ResearchSessionUpdateWithoutNodeLogsInput>, ResearchSessionUncheckedUpdateWithoutNodeLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NodeLogCreateWithoutSessionInput = {
    id?: string
    nodeName: string
    status: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: number | null
    createdAt?: Date | string
  }

  export type NodeLogUncheckedCreateWithoutSessionInput = {
    id?: string
    nodeName: string
    status: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: number | null
    createdAt?: Date | string
  }

  export type NodeLogCreateOrConnectWithoutSessionInput = {
    where: NodeLogWhereUniqueInput
    create: XOR<NodeLogCreateWithoutSessionInput, NodeLogUncheckedCreateWithoutSessionInput>
  }

  export type NodeLogCreateManySessionInputEnvelope = {
    data: NodeLogCreateManySessionInput | NodeLogCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type NodeLogUpsertWithWhereUniqueWithoutSessionInput = {
    where: NodeLogWhereUniqueInput
    update: XOR<NodeLogUpdateWithoutSessionInput, NodeLogUncheckedUpdateWithoutSessionInput>
    create: XOR<NodeLogCreateWithoutSessionInput, NodeLogUncheckedCreateWithoutSessionInput>
  }

  export type NodeLogUpdateWithWhereUniqueWithoutSessionInput = {
    where: NodeLogWhereUniqueInput
    data: XOR<NodeLogUpdateWithoutSessionInput, NodeLogUncheckedUpdateWithoutSessionInput>
  }

  export type NodeLogUpdateManyWithWhereWithoutSessionInput = {
    where: NodeLogScalarWhereInput
    data: XOR<NodeLogUpdateManyMutationInput, NodeLogUncheckedUpdateManyWithoutSessionInput>
  }

  export type NodeLogScalarWhereInput = {
    AND?: NodeLogScalarWhereInput | NodeLogScalarWhereInput[]
    OR?: NodeLogScalarWhereInput[]
    NOT?: NodeLogScalarWhereInput | NodeLogScalarWhereInput[]
    id?: StringFilter<"NodeLog"> | string
    sessionId?: StringFilter<"NodeLog"> | string
    nodeName?: StringFilter<"NodeLog"> | string
    status?: StringFilter<"NodeLog"> | string
    payload?: JsonNullableFilter<"NodeLog">
    durationMs?: IntNullableFilter<"NodeLog"> | number | null
    createdAt?: DateTimeFilter<"NodeLog"> | Date | string
  }

  export type ResearchSessionCreateWithoutNodeLogsInput = {
    id?: string
    companyName: string
    decision?: string | null
    compositeScore?: number | null
    riskLevel?: string | null
    reasoningSummary?: string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    browserSessionId?: string | null
  }

  export type ResearchSessionUncheckedCreateWithoutNodeLogsInput = {
    id?: string
    companyName: string
    decision?: string | null
    compositeScore?: number | null
    riskLevel?: string | null
    reasoningSummary?: string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    browserSessionId?: string | null
  }

  export type ResearchSessionCreateOrConnectWithoutNodeLogsInput = {
    where: ResearchSessionWhereUniqueInput
    create: XOR<ResearchSessionCreateWithoutNodeLogsInput, ResearchSessionUncheckedCreateWithoutNodeLogsInput>
  }

  export type ResearchSessionUpsertWithoutNodeLogsInput = {
    update: XOR<ResearchSessionUpdateWithoutNodeLogsInput, ResearchSessionUncheckedUpdateWithoutNodeLogsInput>
    create: XOR<ResearchSessionCreateWithoutNodeLogsInput, ResearchSessionUncheckedCreateWithoutNodeLogsInput>
    where?: ResearchSessionWhereInput
  }

  export type ResearchSessionUpdateToOneWithWhereWithoutNodeLogsInput = {
    where?: ResearchSessionWhereInput
    data: XOR<ResearchSessionUpdateWithoutNodeLogsInput, ResearchSessionUncheckedUpdateWithoutNodeLogsInput>
  }

  export type ResearchSessionUpdateWithoutNodeLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    compositeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    reasoningSummary?: NullableStringFieldUpdateOperationsInput | string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    browserSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResearchSessionUncheckedUpdateWithoutNodeLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    compositeScore?: NullableFloatFieldUpdateOperationsInput | number | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    reasoningSummary?: NullableStringFieldUpdateOperationsInput | string | null
    quantMetrics?: NullableJsonNullValueInput | InputJsonValue
    qualMetrics?: NullableJsonNullValueInput | InputJsonValue
    competitorData?: NullableJsonNullValueInput | InputJsonValue
    executionTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    browserSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NodeLogCreateManySessionInput = {
    id?: string
    nodeName: string
    status: string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: number | null
    createdAt?: Date | string
  }

  export type NodeLogUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NodeLogUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NodeLogUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeName?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    payload?: NullableJsonNullValueInput | InputJsonValue
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}