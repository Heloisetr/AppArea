import React from 'react';
import Screen from './Screen';

import HomePage from '../../Scenes/HomePage';
import ServicesPage from '../../Scenes/AllServices';
import ProfilePage from '../../Scenes/ProfilePage';
import WeatherS from '../../Scenes/Services/WeatherS';

export const ProfileScreen = () => <ProfilePage />;
export const HomeScreen = () => <HomePage />;
export const FAQScreen = () => <WeatherS />;
export const ServicesScreen = () => <ServicesPage />;