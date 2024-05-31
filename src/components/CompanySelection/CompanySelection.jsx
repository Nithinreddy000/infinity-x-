import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CompanySelection.module.css';
import codeplayerslogo from '../assets/logo.png';
import refresh from '../assets/refresh2.gif';
import searchIcon from '../assets/search2.gif';

const API_URL = 'https://Nithinreddy000.github.io/infinity-x-/api/companies';
const GUID_KEY = 'guid';

const CompanySelection = () => {
    const [companies, setCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompanies();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, companies]);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(GUID_KEY)}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                setCompanies(data);
                setFilteredCompanies(data);
            } else {
                setError(data.message || 'Failed to fetch companies');
            }
        } catch (err) {
            setError('An error occurred while fetching companies');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        const filtered = companies.filter(company => 
            company.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCompanies(filtered);
    };

    const handleCompanyClick = (companyId) => {
        navigate(`/CompanyLogin/${companyId}`);
    };

    const handleRefresh = () => {
        fetchCompanies();
    };

    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
    };

    return (
        <div className={styles.container}>
            <div className={styles.hello}>
                <img src={codeplayerslogo} alt='infinity erp logo'/>
            </div>
            <div className={styles.header}>
                <h1 className={styles.min}>Select Company</h1>
                <div className={styles.buttonsContainer}>
                    <button onClick={toggleSearch} className={styles.searchButton}>
                        <img className={styles.q} src={searchIcon} alt="search"/>
                    </button>
                    <button onClick={handleRefresh} className={styles.searchButton}>
                        <img className={styles.q} src={refresh} alt="refresh"/>
                    </button>
                </div>
            </div>
            <input
                type="text"
                placeholder="Search Companies"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${styles.searchInput} ${isSearchActive ? styles.active : ''}`}
                style={{ display: isSearchActive ? 'block' : 'none' }}
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : (
                <ul className={styles.companyList}>
                    {filteredCompanies.map(company => (
                        <li key={company.id} className={styles.companyItem} onClick={() => handleCompanyClick(company.id)}>
                            <div className={styles.companyInfo}  >
                                <img src={`data:image/png;base64, ${company.image}`} alt={company.name} className={styles.companyImage} style={{ marginRight: '10px' }  }/>
                                <span className={styles.companyName}>{company.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CompanySelection;
