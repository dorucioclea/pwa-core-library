import { IHttpService } from '../../services/http'
import { Identity, Profession } from './types'

export const getIdentityRequest = async (http: IHttpService, id: string) => await http.get<Identity | null>(`identity/${id}`)

export const getProfessionsRequest = async (http: IHttpService) => await http.get<Profession[]>('professions')

export const storeProfessionsRequest = async (http: IHttpService, professions: string[]) => await http.post('professions', { selected: professions })
