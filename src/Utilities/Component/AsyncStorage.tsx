import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageUtil {

  
  static async clear() {
    AsyncStorage.clear();
  }

  static async storelogindata(Data:any) {
    const log :any = ['Token', Data.token];
    const userId = ['userid', Data.user_id.toString()];
    const name = ['name', Data.name];
    const profile = ['profilepic', Data.profile_pic];
    try {
      await AsyncStorage.multiSet([log, userId, name, profile]);
    } catch (e) {
      // saving error
    }
  }
  
  
}

export default AsyncStorageUtil;
