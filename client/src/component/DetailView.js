import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../style/DetailView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCamera, faLocationDot, faGlobe, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { getScrapeDetailsById } from '../service/auth.service';

const DetailView = () => {
    const { id } = useParams(); 
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchCompanyDetail = async () => {
            setLoading(true);
            try {
                const data = await getScrapeDetailsById(id);
                setDetail(data);
            } catch (error) {
                console.error('Failed to fetch company detail', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetail(); 
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!detail) return <div>Company not found</div>;

    return (
        <div className="detail-view">
            <div className="breadcrumbs">
                <Link to="/">Home</Link> &gt; {detail.Name}
            </div>
            <div className="company-info">
                <div className="logo-container">
                    <img src={detail.logo} alt={`${detail.Name} logo`} className="logo" />
                </div>
                <div className="description">
                    <h2>{detail.Name}</h2>
                    <p>{detail.Description}</p>
                </div>
                <div className="contact-info">
                    <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong><br /> {detail.Phone}</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong><br /> {detail.email}</p>
                </div>
            </div>
            <div className="additional-info">
                <div className="details">
                    <h3>Company Details</h3>
                    <p><FontAwesomeIcon icon={faGlobe} /> <strong>Website:</strong><br /> {detail.url}</p>
                    <p><FontAwesomeIcon icon={faInfoCircle} /> <strong>Description:</strong><br /> {detail.Description}</p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong><br /> {detail.email}</p>
                    <p><FontAwesomeIcon icon={faFacebook} /> <strong>Facebook:</strong><br /> <a href={detail.Facebook} target="_blank" rel="noopener noreferrer">{detail.Facebook}</a></p>
                    <p><FontAwesomeIcon icon={faTwitter} /> <strong>Twitter:</strong><br /> <a href={detail.Twitter} target="_blank" rel="noopener noreferrer">{detail.Twitter}</a></p>
                    <p><FontAwesomeIcon icon={faLinkedin} /> <strong>LinkedIn:</strong><br /> <a href={detail.LinkedIn} target="_blank" rel="noopener noreferrer">{detail.LinkedIn}</a></p>
                    <p><FontAwesomeIcon icon={faInstagram} /> <strong>Instagram:</strong><br /> <a href={detail.Instagram} target="_blank" rel="noopener noreferrer">{detail.Instagram}</a></p>
                    <p><FontAwesomeIcon icon={faLocationDot} /> <strong>Address:</strong><br /> {detail.address}</p>
                </div>
                <div className="screenshot">
                    <h3><FontAwesomeIcon icon={faCamera} /> Screenshot of webpage</h3>
                    <img src={detail.screenshot} alt={`${detail.Name} logo`} className="screenshot-image" />
                </div>
            </div>
        </div>
    );
};

export default DetailView;
