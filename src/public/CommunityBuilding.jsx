import React from 'react';
import '../style/CommunityBuilding.css';

const ProfixCommunity = () => {
    return (
        <div className="community-container">
            <header className="community-header">Profix Community</header>
            <div className="community-content">
                <h1>Together, We Build a Better Future</h1>
                <p>Join our network of home repair professionals, customers, and service providers. Connect, collaborate, and grow with Profix.</p>
                <a href="https://chat.whatsapp.com/your-group-invite-link" className="btn" target="_blank" rel="noopener noreferrer">
                    Join our Whatsapp Community
                </a>
            </div>
        </div>
    );
};

export default ProfixCommunity;
