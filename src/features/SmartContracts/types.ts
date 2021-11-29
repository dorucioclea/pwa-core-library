export type SmartContractConfig = {
  Address: string
  Functions: Record<string, SmartContractFunctionConfig>
}

type SmartContractFunctionConfig = {
  FunctionName: string
  GasLimit: number
}
