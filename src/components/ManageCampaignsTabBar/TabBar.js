import {useContext, useEffect, useState} from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import UpcomingCampaignsTab from './CampaignsTab';
import LiveCampaignsTab from './CampaignsTab';
import PastCampaignsTab from './CampaignsTab';
import '../../styles/ManageCampaignsTabBar/TabBar.css';
import {data} from '../../data.js'
import LanguageContext from '../../context/LanguageContext';

//Resuses the CampaignsTab component to render Upcomming, Live and Past campaigns
export default function TabBar(props){
    const [key, setKey] = useState('UpcomingCampaigns');
    const [campaigns, setCampaigns] = useState(data);                 //state to store all the campaigns
    const [upcommingCampaigns, setUpcommingCampaigns] = useState([]); //state to store all the Upcomming campaigns
    const [liveCampaigns, setLiveCampaigns] = useState([]);           //state to store all the Live campaigns
    const [pastCampaigns, setPastCampaigns] = useState([]);           //state to store all the Past campaigns
    const [activeTab, setActiveTab] = useState(1);                    //state to keep tract of active tab bar
    const {language} = useContext(LanguageContext);                   //fetch the selected language
    
    //divides campaigns into Upcomming, Live, Past categories when ever a change is made onto the state i.e. campaigns 
    useEffect(()=>{
      const curr_date = new Date();
      curr_date.setHours(0,0,0,0)
      let upcommingCampaigns=[];
      let liveCampaigns=[];
      let pastCampaigns=[];

      campaigns.forEach((campaign) => {
        let event_date = new Date(campaign.event_date);
        if(event_date > curr_date)
          upcommingCampaigns = [...upcommingCampaigns, campaign];
        else if(event_date < curr_date)
          pastCampaigns = [...pastCampaigns, campaign];
        else 
          liveCampaigns = [...liveCampaigns, campaign];
      });

      setUpcommingCampaigns(upcommingCampaigns);
      setPastCampaigns(pastCampaigns);
      setLiveCampaigns(liveCampaigns);

    },[campaigns]);
    
    //below function re-schedules the campaign to the selected date
    const schedule = (id, date) => {
        const temp = campaigns.map( (campaign)=>{
            if(campaign.id === id)
              campaign.event_date = date;
            return campaign;
        })
        setCampaigns(temp);
    }

    //data to be displayed as per the selected language
    const text = {
      english:{
        upcommingCampain: 'Upcoming Campaigns',
        liveCampaigns: 'Live Campaigns',
        pastCampaigns: 'Past Campaigns',
      },
      german:{
        upcommingCampain: 'Kommende Kampagnen',
        liveCampaigns: 'Live-Kampagnen',
        pastCampaigns: 'Vergangene Kampagnen',
      }
    }
    return (
            <Tabs
              id="ManageCampaignsTabBar"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab 
                eventKey="UpcomingCampaigns" 
                title={text[language].upcommingCampain} 
                onClick={()=>{setActiveTab(1)}}
                tabClassName={activeTab===1?'active':'inactive'}
              >
                <UpcomingCampaignsTab campaigns={upcommingCampaigns} reschedule = {schedule}/>
              </Tab>
              <Tab 
                eventKey="LiveCampaigns" 
                title={text[language].liveCampaigns} 
                onClick={()=>{setActiveTab(2)}}
                tabClassName={activeTab===2?'active':'inactive'}
              >
                <LiveCampaignsTab campaigns={liveCampaigns} reschedule = {schedule}/>
              </Tab>
              <Tab 
                eventKey="PastCampaigns" 
                title={text[language].pastCampaigns} 
                onClick={()=>{setActiveTab(3)}}
                tabClassName={activeTab===3?'active':'inactive'}
              >
                <PastCampaignsTab campaigns={pastCampaigns} reschedule = {schedule}/>
              </Tab>
            </Tabs>
      );
}