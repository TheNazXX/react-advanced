export {getProfileData} from './model/selectors/getProfileData/getProfileData';
export { getProfileError } from './model/selectors/getProfileError/getProfileError';
export { getProfileIsLoading } from './model/selectors/getProfileIsLoading/getProfileIsLoading';
export { fetchProfileData } from './model/service/fetchProfileData'
export type { ProfileInterface, ProfileSchema } from './model/types/profile'
export { profileReducer, profileActions } from './model/slice/ProfileSlice'
export { Profile } from './ui/Profile'

