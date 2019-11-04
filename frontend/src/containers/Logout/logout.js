/**
* logout : component for logout
*/
import React , {Component} from 'react';
/*------- connect react with redux --------*/
import { connect } from 'react-redux';
import { logoutAdmin } from '../../actions';

   
   class LogoutContainer extends Component {
   
     
        componentWillMount(){
         this.props.dispatch(logoutAdmin());
        }

        componentWillReceiveProps(nextProps){
            if(nextProps.data.logout){
                if(nextProps.data.logout.isLogout){
                    setTimeout(() => {
                        this.props.history.push('/') 
                     }, 2000);
                }
            }
        }

      render(){
        return (
            <div className="logout_container">
                <h1>
                    Sorry to see you go :( 
                </h1> 
            </div>
        );
      }
   };
   
  
function mapStateToProps(state){
    console.log(state.users)
    return {
        data: state.users,
    }
}


export default connect(mapStateToProps)(LogoutContainer);


