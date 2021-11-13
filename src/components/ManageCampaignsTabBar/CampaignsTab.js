import '../../styles/ManageCampaignsTabBar/CampaignsTab.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Calendar from 'react-calendar';
import { useContext, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Modal from 'react-bootstrap/Modal'
import calenderIcon from '../../images/Dashboard/Row/Group/calendar.png';
import reportIcon from '../../images/Dashboard/Row/Group 2/statistics-report.png';
import fileIcon from '../../images/Dashboard/Row/Group 3/file.png';
import priceIcon from '../../images/Dashboard/Row/Group 4/Price.png';
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container'
import LanguageContext from '../../context/LanguageContext';
 
export default function CampaignsTab(props){
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedCampaignId, setSelectedCampaignId] = useState();
    const [showPricing, setShowPricing] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState({});

    const handleClose = () => setShowCalendar(false);
    const handleShow = () => setShowCalendar(true);

    const closePricingModal = () => setShowPricing(false);
    const showPricingModal = () => setShowPricing(true);

    const text = {
      english:{
        date: 'DATE',
        campaign: 'CAMPAIGN',
        view: 'VIEW',
        actions: 'ACTIONS',
        viewPricing: 'View Pricing',
        report: 'Report',
        scheduleAgain: 'Schedule Again',
        csv: 'CSV',
        pricing: 'Pricing',
        period1: '1 Week - 1 Month',
        period2: '6 Months',
        period3: '1 Year',
        close: 'Close'

      },
      german:{
        date: 'DATUM',
        campaign: 'KAMPAGNE',
        view: 'AUSSICHT',
        actions: 'AKTIONEN',
        viewPricing: 'Preise anzeigen',
        report: 'Prüfbericht',
        scheduleAgain: 'Erneut planen',
        csv: 'CSV',
        pricing: 'Preisgestaltung',
        period1: '1 Woche - 1 Monat',
        period2: '6 Monate',
        period3: '1 Jahr',
        close: 'Nah dran'
      }
    }
    const {language} = useContext(LanguageContext);
    return(
        <div className='campaign-tab'>
                <div className='table-header'>
                  <Row>
                    <Col sm='auto' className='mandatory-col date-col'>
                      <h5 className='table-header-tag'>{text[language].date}</h5>
                    </Col>
                    <Col sm='auto' className='mandatory-col campaign-col'>
                      <h5 className='table-header-tag'>{text[language].campaign}</h5>
                    </Col>
                    <Col sm='auto' className='optional-col view-col' >
                      <h5 className='table-header-tag'>{text[language].view}</h5>
                    </Col>
                    <Col sm='auto' className='optional-col action-col' >
                      <h5 className='table-header-tag'>{text[language].actions}</h5>
                    </Col>
                  </Row>
                </div>
                <br/>
                <div>
                  {
                    props.campaigns.map((campaign)=>(
                    <div>
                      <Row key={campaign.id}>
                        <Col sm='auto' className='mandatory-col date-col'>
                          <Moment 
                            date={new Date(campaign.event_date)} 
                            format="MMM YYYY, DD" 
                            trim 
                            className='big-tag'
                             />
                          <br/>
                          <Moment 
                          date={new Date(campaign.event_date)}
                          fromNow 
                          className='tag' />
                        </Col>
                        <Col sm='auto' className='mandatory-col campaign-col'>
                          <Row>
                            <Col sm='auto' className='campaign-image-col'>
                              <img src={campaign.image_url} alt='' className='campaign-image'/>
                            </Col>

                            <Col>
                              <div className='campaign-tag-div'> 
                                <h6 className='tag campaign-tag'>{campaign.name}</h6>
                              </div>

                              <div className='actions-btn'>
                              <div className='actions-btn-optional-row'>
                                <Moment 
                                  date={new Date(campaign.event_date)} 
                                  format="MMM YYYY, DD" 
                                  trim 
                                  className='big-tag actions-btn-optional-row-item'
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Moment 
                                date={new Date(campaign.event_date)}
                                fromNow 
                                className='big-tag actions-btn-optional-row-item' />
                              </div>
                              <div className='actions-btn-row'>
                                <img  
                                  src={priceIcon} 
                                  alt=''
                                  onClick={
                                    ()=>{
                                        setSelectedCampaign(campaign);
                                        showPricingModal();
                                    }
                                    }
                                    className='pointer-cur action-btn-items'
                                />
                                <a href={campaign.csv}>
                                  <img  
                                    src={fileIcon} 
                                    alt='' 
                                    className='action-btn-items'
                                  />
                                </a>
                                <a href={campaign.report}>
                                  <img  
                                    src={reportIcon} 
                                    alt='' 
                                    className='action-btn-items'
                                  />
                                </a>
                                <img  
                                  src={calenderIcon} 
                                  alt='' 
                                  onClick={()=>{
                                    setSelectedCampaignId(campaign.id);
                                    handleShow();
                                  }}
                                  className='pointer-cur action-btn-items'
                                />
                                </div>
                              </div>
                               
                            </Col>
                          </Row>
                        </Col>
                        <Col sm='auto' className='optional-col view-col'>
                          <div onClick={
                              ()=>{
                                  setSelectedCampaign(campaign);
                                  showPricingModal();
                              }
                              }
                              className='pointer-cur'
                          >
                            <img  
                              src={priceIcon} 
                              alt='' 
                              className='image-icon'
                            />
                            &nbsp;&nbsp;
                              <h6 className='tag responsive-tag'>{text[language].viewPricing}</h6>
                          </div>
                        </Col>
                        <Col sm='auto' className='optional-col action-col'>
                        <Row>
                          <Col sm='3'>
                            <a href={campaign.csv}>
                              <img  
                                src={fileIcon} 
                                alt='' 
                                className='image-icon'
                              />
                              &nbsp;&nbsp;
                              <h6 className='tag responsive-tag'>{text[language].csv}</h6>
                            </a>
                          </Col>
                          <Col sm='4'>
                            <a href={campaign.report}>
                              <img  
                                src={reportIcon} 
                                alt='' 
                                className='image-icon'
                              />
                              &nbsp;&nbsp;
                              <h6 className='tag responsive-tag'>{text[language].report}</h6>
                            </a>
                          </Col>
                          <Col sm='5'>
                          <div 
                            onClick={()=>{
                              setSelectedCampaignId(campaign.id);
                              handleShow();
                            }}
                            className='pointer-cur'
                          >
                            <img  
                              src={calenderIcon} 
                              alt='' 
                              className='image-icon'
                            />
                            &nbsp;&nbsp;
                            <h6 className='tag responsive-tag'>{text[language].scheduleAgain}</h6>
                          </div>
                          </Col>
                        </Row>
                        </Col>
                      </Row>
                      <br/>
                    </div>
                    ))
                  }
                </div>
            <Modal show={showCalendar} onHide={handleClose} >
              <div className='calendar-modal'>
                <Calendar
                  onChange={ 
                    (el)=>{
                      props.reschedule(selectedCampaignId, el.toDateString());
                      handleClose();
                    }
                  }
                />
              </div>
            </Modal>

            <Modal show={showPricing} onHide={closePricingModal} >
              <div className='pricing-modal'>
                
                <Row xs='auto'>
                  <Col md="auto">
                    <img src={selectedCampaign.image_url} alt='' className='campaign-modal-image'/>
                  </Col>

                  <Col md="auto">
                    <Row>
                      <h3>{selectedCampaign.name}</h3>
                    </Row>
                    <Row>
                      <h6 className='tag'>{selectedCampaign.region}</h6>
                    </Row>
                  </Col>
                </Row> 
                <br/>

                <Container> 
                    <Row>
                    <div>
                      <h2 className='pricing-modal-tag'>{text[language].pricing}</h2>
                    </div>
                    </Row>
                    <div className='small-span'/>
                    <Row>
                      <Col md={8}>
                        <Row>
                          <h6 className='big-tag'>{text[language].period1}</h6>
                        </Row>
                        <div className='small-span'/>
                        <Row>
                          <h6 className='big-tag'>{text[language].period2}</h6>
                        </Row>
                        <div className='small-span'/>
                        <Row>
                          <h6 className='big-tag'>{text[language].period3}</h6>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <h6 className='price-tag'>$ 100.00</h6>
                        </Row>
                        <div className='small-span'/>
                        <Row>
                          <h6 className='price-tag'>$ 500.00</h6>
                        </Row>
                        <div className='small-span'/>
                        <Row>
                          <h6 className='price-tag'>$ 900.00</h6>
                        </Row>
                      </Col>
                    </Row>
                </Container>
                <br/>
                <br/>
                <Container>
                  <Row>
                    <div className='flex-div'>
                      <button 
                        className='pricing-modal-btn' 
                        onClick={closePricingModal} > 
                          <div className='flex-div'>
                          <h5 
                            style={{
                                color:'black',
                                fontSize: '1rem',
                              }}>

                              {text[language].close}
                          </h5>
                          </div> 
                      </button>
                    </div>
                  </Row>
                </Container>
              </div>
            </Modal>
        </div>
    );
}

