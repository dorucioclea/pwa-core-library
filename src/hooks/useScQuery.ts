import { ScInfo } from '../types'
import { IWalletService } from '../services/wallet'
import { ContractFunction, SmartContract, Address, Interaction, AbiRegistry, SmartContractAbi, ResultsParser } from '@elrondnetwork/erdjs'

export const useScQuery = (wallet: IWalletService, scInfo: ScInfo) => {
  const _createScInteraction = async (args: any[]) => {
    if (!scInfo?.abiUrl || !scInfo?.abiName) {
      const sc = new SmartContract({ address: new Address(scInfo?.address) })
      return new Interaction(sc, new ContractFunction(scInfo?.endpoint || ''), args)
    }

    const abiRes = await fetch(scInfo.abiUrl!)
    const registry = AbiRegistry.create(await abiRes.json())
    const abi = new SmartContractAbi(registry, [scInfo.abiName!])
    const sc = new SmartContract({ address: new Address(scInfo.address), abi })

    return sc.methods[scInfo.endpoint](args)
  }

  const query = async (args?: any[]) => {
    const interaction = await _createScInteraction(args || [])
    const queryResponse = await wallet.getNetworkProvider().queryContract(interaction.buildQuery())
    const parsed = new ResultsParser().parseQueryResponse(queryResponse, interaction.getEndpoint())

    return parsed
  }

  return { query }
}
