import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'balance' : ActorMethod<[], bigint>,
  'baseBuffer' : ActorMethod<[Array<bigint>], undefined>,
  'stdBuffer' : ActorMethod<[Array<bigint>], undefined>,
}
