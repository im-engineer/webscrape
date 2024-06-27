import React, { useState, useEffect } from 'react';
import '../style/Home.css';
import { CSVLink } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { save, getAllScapeDetails, deleteScrapeDetailsById } from "../service/auth.service";

const Home = () => {
    const [domain, setDomain] = useState('');
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        fetchCompanyList();
    }, []);

    const fetchCompanyList = async () => {
        try {
            const response = await getAllScapeDetails();
            setDetails(response.data);
        } catch (error) {
            console.error('Failed to fetch company list', error);
        }
    };

    const handleFetch = async () => {
        setLoading(true);
        try {
            const response = await save(domain);
            setDetails([...details, response.data]);
        } catch (error) {
            console.error('Failed to fetch and save company data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const idsToDelete = details.filter((_, index) => selected.includes(index)).map(company => company._id);
            await deleteScrapeDetailsById(idsToDelete); 
            setDetails(details.filter((_, index) => !selected.includes(index)));
            setSelected([]);
            setSelectAll(false);
        } catch (error) {
            console.error('Failed to delete companies', error);
        }
    };

    const handleSelect = (index) => {
        setSelected((prev) => {
            const newSelected = [...prev];
            if (newSelected.includes(index)) {
                return newSelected.filter((i) => i !== index);
            } else {
                newSelected.push(index);
                return newSelected;
            }
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelected([]);
        } else {
            setSelected(details.map((_, index) => index));
        }
        setSelectAll(!selectAll);
    };

    const csvHeaders = [
        { label: "Company", key: "name" },
        { label: "Description", key: "description" },
        { label: "Address", key: "address" },
        { label: "Phone No.", key: "phone" },
        { label: "Email", key: "email" },
        { label: "Facebook", key: "facebook" },
        { label: "Twitter", key: "twitter" },
        { label: "LinkedIn", key: "linkedin" },
        { label: "Instagram", key: "instagram" }
    ];

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    };

    return (
        <div className="app-container">
            <header className="header">
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain name"
                    className="search-input"
                />
                <button onClick={handleFetch} className="fetch-button" disabled={loading}>
                    {loading ? 'Fetching...' : 'Fetch & Save Details'}
                </button>
            </header>
            <div className="action-buttons">
                <span>{selected.length} selected</span>
                <button onClick={handleDelete} disabled={selected.length === 0}>Delete</button>
                <CSVLink data={details.filter((_, index) => selected.includes(index))} headers={csvHeaders}
                    filename="details.csv">
                    <button disabled={selected.length === 0}>Export as CSV</button>
                </CSVLink>
            </div>
            <div className="table-container">
                <table className="details-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>COMPANY</th>
                            <th>SOCIAL PROFILES</th>
                            <th>DESCRIPTION</th>
                            <th>ADDRESS</th>
                            <th>PHONE NO.</th>
                            <th>EMAIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((detail, index) => (
                            <tr key={detail._id} className={selected.includes(index) ? 'selected' : ''}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(index)}
                                        onChange={() => handleSelect(index)}
                                    />
                                </td>
                                <td className="company-cell">
                                    {detail.name}
                                </td>
                                <td className="social-profiles">
                                    {detail.facebook && <a href={detail.facebook} target="_blank"
                                        rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>}
                                    {detail.twitter && <a href={detail.twitter} target="_blank"
                                        rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>}
                                    {detail.linkedin && <a href={detail.linkedin} target="_blank"
                                        rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>}
                                </td>
                                <td>{truncateDescription(detail.description, 17)}</td>
                                <td>{detail.address}</td>
                                <td>{detail.phone}</td>
                                <td>{detail.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
