import { AuthResource } from './resources'

export default {
  login (data) {
    AuthResource.save(data)
  }
}
