import {useContext, useEffect, useState} from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import UpcomingCampaignsTab from './CampaignsTab';
import LiveCampaignsTab from './CampaignsTab';
import PastCampaignsTab from './CampaignsTab';
import '../../styles/ManageCampaignsTabBar/TabBar.css';
import {data} from '../../data.js'
import LanguageContext from '../../context/LanguageContext';

export default function TabBar(props){
    const [key, setKey] = useState('UpcomingCampaigns');
    const [campaigns, setCampaigns] = useState(data);
    const [upcommingCampaigns, setUpcommingCampaigns] = useState([]);
    const [liveCampaigns, setLiveCampaigns] = useState([]);
    const [pastCampaigns, setPastCampaigns] = useState([]);
    
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
    
    const schedule = (id, date) => {
        const temp = campaigns.map( (campaign)=>{
            if(campaign.id === id)
              campaign.event_date = date;
            return campaign;
        })
        setCampaigns(temp);
    }

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
    const {language} = useContext(LanguageContext);
    const {activeTab, setActiveTab} = useState(1);
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