import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NotFound from './404';
import StripeCallback from './stripe/StripeCallback';
import PrivateRoute from './components/PrivateRoute';
import New from './hotels/New';
import EditHotel from './hotels/EditHotel';
import ViewHotel from './hotels/ViewHotel';
import StripeCancel from './stripe/StripeCancel';
import StripeSuccess from './stripe/StripeSuccess';

import TopNav from './components/TopNav';

function App() {
  return (
    <BrowserRouter>
      <TopNav></TopNav>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/hotel/:hotelId" component={ViewHotel} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller} />
        <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
        <PrivateRoute exact path="/hotels/new" component={New} />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
        <PrivateRoute exact path="/stripe/success/:hotelId" component={StripeSuccess} />
        <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
