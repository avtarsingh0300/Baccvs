import 'react-native-gesture-handler';
import React from 'react';
import NavigationStrings from '../Utilities/Constants/NavigationStrings';
import TabRoutes from './TabRoutes';
import * as screens from './index';
export default function MainStack(Stack: any) {
  return (
    <>
      <Stack.Screen
        name={NavigationStrings?.TabRoutes}
        component={TabRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.EventFilter}
        component={screens.EventFilter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.EventDetails}
        component={screens.EventDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.Notification}
        component={screens.Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.Settings}
        component={screens.Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.Report}
        component={screens.Report}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.MapScreen}
        component={screens.MapScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.Messages}
        component={screens.Messages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.MyEvents}
        component={screens.MyEvents}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.AddPeople}
        component={screens.AddPeople}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.EditGroup}
        component={screens.EditGroup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.CreateSuccess}
        component={screens.CreateSuccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.AccountInfo}
        component={screens.AccountInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.ChangePass}
        component={screens.ChangePass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.DeactiveScreen}
        component={screens.DeactivateScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.BlockedAccount}
        component={screens.BlockAccounts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.Invites}
        component={screens.Invites}
        options={{headerShown: false}}
      />
           <Stack.Screen
        name={NavigationStrings.UserProfile}
        component={screens.UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.EditProfile}
        component={screens.EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.SocialPart}
        component={screens.SocialPart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.CreateGroup}
        component={screens.CreateGroup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.MyGroups}
        component={screens.MyGroups}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.Scanner}
        component={screens.Scanner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.Tickets}
        component={screens.Tickets}
        options={{headerShown: false}}
      />     
      <Stack.Screen
        name={NavigationStrings.SelectTicket}
        component={screens.SelectTicket}
        options={{headerShown: false}}
      />     
      <Stack.Screen
        name={NavigationStrings.UploadTicket}
        component={screens.UploadTicket}
        options={{headerShown: false}}
      />     
    </>
  );
}
