import React, { useState, useEffect } from 'react';
import '../style/PromoDiscount.css';

const PromoOffers = () => {
    const [offers, setOffers] = useState([]);

    // Function to load offers from localStorage
    const loadOffers = () => {
        const savedOffers = JSON.parse(localStorage.getItem('offers')) || [];
        setOffers(savedOffers);
    };

    // Function to handle adding a new offer
    const addOffer = (offer) => {
        const updatedOffers = [...offers, offer];
        setOffers(updatedOffers);
        localStorage.setItem('offers', JSON.stringify(updatedOffers));
    };

    // Function to remove an offer
    const removeOffer = (offerToRemove) => {
        const updatedOffers = offers.filter(offer => 
            offer.title !== offerToRemove.title || 
            offer.description !== offerToRemove.description || 
            offer.validity !== offerToRemove.validity || 
            offer.discount !== offerToRemove.discount
        );
        setOffers(updatedOffers);
        localStorage.setItem('offers', JSON.stringify(updatedOffers));
    };

    // Load offers on component mount
    useEffect(() => {
        loadOffers();
    }, []);

    return (
        <div className="provider-section">
            <h1>Promotional Offers</h1>
            <OfferForm addOffer={addOffer} />
            <OfferList offers={offers} removeOffer={removeOffer} />
        </div>
    );
};

const OfferForm = ({ addOffer }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [validity, setValidity] = useState('');
    const [discount, setDiscount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newOffer = { title, description, validity, discount };
        addOffer(newOffer);
        // Reset the form fields
        setTitle('');
        setDescription('');
        setValidity('');
        setDiscount('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="offerTitle">Offer Title:</label>
            <input type="text" id="offerTitle" value={title} onChange={(e) => setTitle(e.target.value)} required />
            
            <label htmlFor="offerDescription">Description:</label>
            <textarea id="offerDescription" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            
            <label htmlFor="offerValidity">Validity:</label>
            <input type="date" id="offerValidity" value={validity} onChange={(e) => setValidity(e.target.value)} required />
            
            <label htmlFor="offerDiscount">Discount Percentage:</label>
            <input type="number" id="offerDiscount" min="1" max="100" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
            
            <button type="submit">Add Offer</button>
        </form>
    );
};

const OfferList = ({ offers, removeOffer }) => {
    return (
        <div id="offerList">
            <h2>Current Offers</h2>
            <ul>
                {offers.map((offer, index) => (
                    <li key={index}>
                        <div>
                            <h3>{offer.title}</h3>
                            <p>{offer.description}</p>
                            <small>Valid until: {offer.validity} | Discount: {offer.discount}%</small>
                        </div>
                        <button className="remove-btn" onClick={() => removeOffer(offer)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PromoOffers;
