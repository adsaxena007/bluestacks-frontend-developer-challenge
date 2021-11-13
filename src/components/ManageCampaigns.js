
import { useContext } from 'react';
import LanguageContext from '../context/LanguageContext';
import '../styles/ManageCampaigns.css';
import ManageCampaignsTabBar from './ManageCampaignsTabBar/TabBar';


export default function ManageCampaigns(props){
    const text = {
      english:{
        manageCampain: 'Manage Campaigns'
      },
      german:{
        manageCampain: 'Kampagnen verwalten'
      }
    }

    const {language} = useContext(LanguageContext);
    return (
        <div className='mng-campaings'>
          <div className='mng-campaings-header'>
            <h2 className='mng-campaings-tag'>{text[language].manageCampain}</h2>
          </div>
          <div className='mng-campaings-tabbar'>
            <ManageCampaignsTabBar/>
          </div>
        </div>
      );
}