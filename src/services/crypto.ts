import { IDappProvider, ExtensionProvider, SignableMessage, Address } from '@elrondnetwork/erdjs'

export type ElrondWalletProvider = 'extension'

export interface ICryptoService {
  getProvider: () => IDappProvider
  signMessage: (message: string, address: string) => Promise<{ message: string; signature: string; signer: string }>
}

export class ElrondCryptoService implements ICryptoService {
  provider: IDappProvider

  constructor(provider: ElrondWalletProvider) {
    if (provider === 'extension') {
      this.provider = ExtensionProvider.getInstance()
    } else {
      this.provider = ExtensionProvider.getInstance()
    }

    this.provider.init()
  }

  getProvider = () => this.provider

  signMessage = async (message: string, address: string) => {
    const unsignedMsg = new SignableMessage({ message: Buffer.from(message), address: Address.fromBech32(address) })
    const signedMsg = await this.provider.signMessage(unsignedMsg)

    signedMsg.address = Address.fromBech32(address) // possible erdjs bug: address gets lost, so set again

    return {
      message: signedMsg.serializeForSigning().toString('hex'),
      signature: signedMsg.signature.hex(),
      signer: signedMsg.address.hex(),
    }
  }
}
