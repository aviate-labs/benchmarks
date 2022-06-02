export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'balance' : IDL.Func([], [IDL.Nat], ['query']),
    'baseBuffer' : IDL.Func([IDL.Vec(IDL.Nat)], [], []),
    'stdBuffer' : IDL.Func([IDL.Vec(IDL.Nat)], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
