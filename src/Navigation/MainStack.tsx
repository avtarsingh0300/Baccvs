import 'react-native-gesture-handler';
import React from 'react';
import NavigationStrings from '../Utilities/Constants/NavigationStrings';
import TabRoutes from './TabRoutes';
import * as screens from './index';
export default function MainStack(Stack: any, user: any) {
  return (
    <>
      {user?.role != 'user' && (
        <Stack.Screen
          name={NavigationStrings.HomeNight}
          component={screens.HomeNight}
          options={{headerShown: false}}
        />
      )}
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
      <Stack.Screen
        name={NavigationStrings.PeopleLikes}
        component={screens.PeopleLikes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.ReferralCode}
        component={screens.ReferralCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.OtherProfiles}
        component={screens.OtherProfiles}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.QrCode}
        component={screens.QrCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.FollowingScreen}
        component={screens.FollowingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.MeetPeopleFilter}
        component={screens.MeetPeopleFilter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.EditSocialProfile}
        component={screens.EditSocialProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.GrroupDeatils}
        component={screens.GrroupDeatils}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.DatingUserProfile}
        component={screens.DatingUserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.MarketingTools}
        component={screens.MarketingTools}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.FeedbackScreen}
        component={screens.FeedbackScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.PromoteScreen}
        component={screens.PromoteScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.NightEvents}
        component={screens.NightEvents}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.SeeMore}
        component={screens.SeeMore}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.MusicList}
        component={screens.MusicList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.AnalyticsScreen}
        component={screens.AnalyticsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.AgoraSales}
        component={screens.AgoraSales}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.AgoraAttendance}
        component={screens.AgoraAttendance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.Profile}
        component={screens.Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.NightclubEdit}
        component={screens.NightclubEdit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.DjPromoters}
        component={screens.DjPromoters}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.EditDjProfile}
        component={screens.EditDjProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.SetPriceScreen}
        component={screens.SetPriceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.DjBooking}
        component={screens.DjBooking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.DjInvoices}
        component={screens.DjInvoices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.MatchPeople}
        component={screens.MatchPeople}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.FeedBack}
        component={screens.FeedBack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.BankingInfo}
        component={screens.BankingInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.forgotMain}
        component={screens.forgotMain}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.ImagePreview}
        component={screens.ImagePreview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.TransferTicket}
        component={screens.TransferTicket}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationStrings.BuyTickets}
        component={screens.BuyTickets}
        options={{headerShown: false}}
      />
    </>
  );
}
