import {Layout} from 'react-admin';
import MyAppBar from './MyAppBar';
import Menu from './Menu';

const MyLayout = props => {
  return (
    <Layout {...props} appBar={MyAppBar} menu={Menu} />
  )
}

export default MyLayout;