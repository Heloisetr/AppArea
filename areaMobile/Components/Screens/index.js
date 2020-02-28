import React from 'react';
import Screen from './Screen';

import HomePage from '../../Scenes/HomePage';
import AllServices from '../../Scenes/AllServices';
import ProfilePage from '../../Scenes/ProfilePage';
import WeatherS from '../../Scenes/Services/WeatherS';
import ExchangeS from '../../Scenes/Services/ExchangeS';
import NYTimesS from '../../Scenes/Services/NYTimesS';
import SportS from '../../Scenes/Services/SportS';
import BourseS from '../../Scenes/Services/BourseS';

export const ProfileScreen = () => <ProfilePage />;
export const HomeScreen = () => <HomePage />;
export const FAQScreen = () => <WeatherS />;
export const ServicesScreen = () => <AllServices />;

export const WeatherScreen = () => <WeatherS />;
export const ExchangeScreen = () => <ExchangeS />;
export const NYTimesScreen = () => <NYTimesS />;
export const SportScreen = () => <SportS />;
export const BourseScreen = () => <BourseS />;