import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Link,
  Grid,
  Collapse,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ArrowUpward as ArrowUpwardIcon
} from '@mui/icons-material';

const termsData = [
  {
    id: 'abouttheterms',
    title: '1. ABOUT THE TERMS',
    children: [
      {
        id: 'WhatisQuintalStallandwhooperatesit',
        title: '1.1 What is Quintal Stall and who operates it?',
        content: [
          '1. Quintal Stall is an application which provides an online marketplace E-Commerce Platform through web and mobile application ("Application") where one registered Users ("Wholesaler, Reseller, Retailer and Delivery Agent") can undertake activity of sale, purchase and delivering of goods to other registered Users of Application including Delivery Agent commit to deliver the order placed.',
          '2. Quintal Stall offers B2B Market Place Application where Registered User can be Seller, Reseller, Retailer, Wholesaler or Buyer at the same time and Delivery Agents who undertakes activity to delivered Goods. One Registered User can buy and sell goods or merchandise with another Registered User simultaneously except for the Delivery Agent.',
          '3. The Application and the website at www.quintalstall.com ("Website") (collectively, "Platform") are operated by Quintal Stall Private Limited ("Company").',
          '4. The Company’s role is limited to managing the Application and associated marketing, facilitating payment collections, fulfilment, order management, enquiry management and other incidental services to enable the transactions between the registered Users ("Services").',
          '5. Services are made available on the Website and on the mobile application, to avail the same Users are required to register on the platform.',
        ],
      },
      {
        id: 'termApplicability',
        title: '1.2 When are these Terms applicable and binding on User?',
        content: [
          '1. The Agreement is applicable to any person when they install, download or even merely visit or access any part of the Platform or utilise any of the Services, such persons are referred to as users, which include without limitation users who are browsers, Suppliers, Resellers, merchants, other purchaser, delivery agent, vehicle owner or contributors of content (collectively, "User").',
          '2. The Agreement between User and Company is effective on the date on which the Application is downloaded/Website is accessed and/or the date on which terms of Agreement are updated, creating a legally binding arrangement between the User and the Company.',
        ],
      },
      {
        id: 'termModifications',
        title: '1.3 Whether the terms of this Agreement can be modified?',
        content: [
          '1. Users can review the most current version of the Agreement at any time on the Website. The Company reserves the right to unilaterally update, change or replace any part of the Agreement by publishing updates or changes on the Platform and such amended provisions of the Agreement shall be effective immediately upon being posted on the Platform or website.',
          '2. It is the responsibility of the Users to check this page periodically for changes. The Users’ continued use of or access to the Application following the posting of any changes constitutes acceptance of those changes.',
        ],
      },
      {
        id: 'disagreement',
        title: '1.4 What if the terms of the Agreement are not acceptable to User?',
        content: [
          '1. If the User does not agree with the terms of the Agreement, the User is advised to refrain from using the Platform. By the use of the Services, it is signified that the User agrees to abide by the terms of the Agreement (as updated from time to time).',
        ],
      },
    ],
  },
  {
    id: 'ACCOUNTREGISTRATION',
    title: '2. ACCOUNT REGISTRATION, SUSPENSION AND TERMINATION',
    children: [
      {
        id: '2.1',
        title: '2.1 Does a User necessarily need to create an account on the Platform?',
        content: [
          '1. The Company does not permit Users to avail the Services on the Platform without prior registration. Users may access the Application by registering to create an account and become a member. The membership is limited for the purpose of buying or selling or delivering goods or merchandise, is subject to this Agreement and strictly not transferable.',
          ,
        ],
      },
      {
        id: '2.2',
        title: '2.2 For the use of Platform, is a User subject to any eligibility criteria?',
        content: [
          '1. The Services on the Platform shall be availed by User(s) who can form legally binding contracts under Indian Contract Act, 1872 and are at least eighteen (18) years of age.',
          '2. The Company reserves the right to terminate the User’s account and/or deny access to the Platform if it is brought to the Company’s notice or if it is discovered that the User does not meet the conditions herein. Users accessing or using the Platform represent and warrant that they have the right to access or use the Platform.',
        ],
      },
      {
        id: '2.3',
        title: '2.3 Are there any specific requirements for registering an account on Platform?',
        content: [
          '1. The Users are required to enter a valid phone number while registering on Platform. By such registration, User consents to be contacted by Company via phone calls, SMS notifications, instant messages or other such means of communication inter alia for subscription/services/promotional updates etc. Users may opt out of such subscription/service/promotional updates either through the /‘opt out means provided or by writing to the support team.',
          '2. It is the responsibility of the Users to provide correct mobile number so that the Company can communicate with the Users via SMS. The Users understand and agree that if the Company sends an SMS, but the Users do not receive it because the Users  mobile number is incorrect or out of data or blocked by the Users service provider, or the Users are otherwise unable to receive SMS, the Company shall be deemed to have provided the communication to the Users effectively.',
          '3. It is the User’s responsibility to provide accurate, current and complete information during the registration process and to update such information to keep it accurate, current and complete.',
        ],
      },
      {
        id: '2.4',
        title: '2.4 Can User account registered on Platform be suspended or terminated?',
        content: [
          '1. The Company reserves the right to suspend or terminate the account or access to Services (or any part thereof) on the Application including blocking any amounts due to the User and associated account without notice and the Users will remain liable for all amounts due up to and including the date of termination, if:',
          '2. any information provided during the registration process or thereafter proves to be inaccurate, not current or incomplete; and/or',
          '3. in Company’s assessment, the User has:',
          '▪ charged an unreasonably high price;',
          '▪ unreasonable instances of returns and/or cancellations initiated;',
          '▪ selling inferior quality goods or selling goods of inferior quality naming it superior quality or displaying superior quality goods wrongfully to cheat other user;',
          '▪ engaged in actions that are unlawful, fraudulent, negligent or derogatory to the Company’s interests.',
          '▪ failed or is suspected to have failed to comply with any term or provision of the Agreement or applicable law.',
          '1. User is found to be non-compliant with the Agreement.',
          '2. Further, where the violation of the Agreement gives rise to criminal or civil action, the Company may at its sole discretion pursue such action.',
          '3. Without prejudice to the above stated rights of the Company, in case of alleged fraud or other breach of this Agreement by User, the Company may at its sole discretion (a) withhold all amounts payable to such User; and (b) impose penalties as the Company may reasonably determine and set off such penalties from the monies payable by Company to such User.',
        ],
      },
      {
        id: '2.5',
        title: '2.5 What are User obligations vis-à-vis its registered account on Platform?',
        content: [
          '1. Having an account on the Platform gives authenticity to the actions of the User. It means that the User is solely responsible for all activities that occur under its account and that all transactions made by such User is intended for bona fide sale or consumption in the course of their business activities.',
          '2. Any and every activity undertaken by a User under his/her account shall be the sole responsibility of such User and the Company shall not be liable for such activity in any manner. Hence it shall be the responsibility of the User to treat the user identification code, password and any other piece of information that is provided by the Company, as part of the security procedures, as confidential and not disclose the same to any person or entity other than the Company.',
          '3. User acknowledges and agrees that having an account on Platform does not grant it any rights on Platform not specifically granted to them by the Company, and that the User has no ownership or other interest in the account. The User understands that all rights in and to the account are and shall forever be owned by and inure to the benefit of the Company.',
          '4. On registration, the Users may receive a password protected account and an identification. The Users agree to:',
          '1. maintain the confidentiality of their password, if applicable;',
          '2. take full responsibility for all activities by Users accessing the Application through their account;',
          '3. immediately notify the Company of any unauthorised use of their account or any other breach of security that they become aware of; and',
          '4. ensure that they exit from their account at the end of each session.',
        ],
      },
    ],
  },
  {
    id: '3',
    title: '3. PLACING ORDERS AND FINANCIAL TERMS',
    children: [
      {
        id: '3.1',
        title: '3.1 How does order placement work on the Platform?',
        content: [
          '1. The Application allows Users to place orders for the products listed by Registered Suppliers on Application and the Application, subject to Agreement herein, facilitates the placement of orders for the products by the Users.',
          '2. On receipt of an order from a User, the Company shall send electronically a confirmation of such order to Registered Supplier and the User concerned. Further, the Company may inform the User about the availability or unavailability or change in price of the order as informed by Supplier concerned, from time to time. Confirmation of the order by Supplier shall be treated as final.',
          '3. The Company does not own, sell or resell any products on its own and/or does not control the Suppliers and only facilitates the transaction between buyers and sellers including User and Supplier as a "marketplace". Company makes all reasonable efforts to promptly update the User’s account and other information to facilitate the transaction completion. Hence, Users are required to provide current, complete, and accurate purchase and account information for all purchases made at on the Application.',
          '4. Additionally, fulfilment of orders to their end users/consumers by a Wholesaler/Reseller shall be the responsibility of the Reseller inter se such end user/consumer. Any add-on service provided by Platform towards such order shall be provided merely as a service provider of such Wholesaler/Reseller by the Platform and accordingly, Platform shall not have any privity of contract with such end user/consumer.',
          ,
        ],
      },
      {
        id: '3.2',
        title: '3.2 How are the commercial terms fixed on Application?',
        content: [
          '1. All commercial/contractual terms of sale are offered by Suppliers and agreed to between Suppliers and the Users alone. The commercial/contractual terms include without limitation, price, date, period and mode of delivery, warranties related to products, etc. Company does not have any control or does not determine or advise or in any way involve itself in the offering or acceptance of such commercial/contractual terms between the Suppliers and the Users.',
          '2. Similarly in case of deliveries effected by Resellers using the Platform, the Platform only acts as a service provider for the Reseller facilitating delivery or other service related to an order. Company does not have any control, nor does it determine or advise or in any way involve itself in the offering or acceptance of such commercial/contractual terms between Reseller and its end user/consumer.',
          '3. Policies related to returns/exchanges, penalties, refunds, cancellation will be updated in the Application from time to time. The Company holds the right to change these policies as required in the Application without any permission from the Users.',
          '4. The Company also reserves the right to withhold benefits such as COD payments, right to claim refunds from time to time at its sole discretion owing to internal reasons or external factors.',
        ],
      },
      {
        id: '3.3',
        title: '3.3 How does payment and settlement of payment work on the Platform?',
        content: [
          '1. The Users acknowledge and agree that the Company may, at the request of the Supplier or the wholesaler of the Reseller, act as the payment agent for the limited purpose of accepting payments on behalf of such Suppliers and Resellers. The Users understand, accept, and agree that the payment facility provided by the Company is neither a banking nor financial service but is merely a facilitator providing a third-party payment processor for the transactions on the Application. Further, by providing payment facility, the Company is neither acting as a trustee nor acting in a fiduciary capacity with respect to the transaction or the transaction price. The Company will not be liable for any charges made by the Users bank in relation to payment of the total amount.',
          '2. In connection with any order, information such as name, transaction details, device type, Platform usage details, PAN number, payment details, billing address and credit card information and any other information in relation thereto may need to be provided either to the Company or the third-party payment processor. If the Users are directed to the third-party payment processor, they may be subject to terms and conditions governing use of that third party’s service and that third party’s personal information collection practices. Users are requested to review such terms and conditions and privacy policy before using the Application. In case of Wholesaler/Reseller providing billing information, delivery address or other contact information of its end user/consumer to Company or other delivery service provider, Wholesaler/Reseller shall ensure that it has necessary consents and approvals from the respective end user/consumer as may be required under applicable law.',
          '3. Company merely collects the payment on behalf of the Supplier or Wholesales or Reseller, as the case may be. All applicable taxes and levies, the rates thereof and the manner of applicability of such taxes are to be charged and determined by the Supplier or Wholesales or Reseller. Company holds no responsibility for the legal correctness/validity of the levy of such taxes. The sole liability with respect to any legal issue arising on the taxes payable shall be with the Reseller.',
          '4. The transaction is bilateral between Registerd Suppliers & Users and/or Wholesaler/Reseller & end users/consumers ("User Transactions"), the Company is not liable to charge or deposit any taxes applicable on such transaction.',
          '5. The User may provide the bank account details to receive any refunds, margins, referrals and/or other payments which may be owed to the User by the Company. While a User is permitted to update the bank account details, the following conditions will apply: (a) the user cannot edit or update the bank account details if the bank details already provided are valid and there is no pending payment to the User from The Company; (b) the user cannot edit or update the bank account details if there is a pending transaction which is being processed to the existing bank account; (c) the user cannot edit or update the bank account details if the new account number which is being inserted is already in use in another User’s account. The User can only attempt to edit or update the bank account details three times in a day. If the User fails to update the bank account within three attempts, the User will have to wait for 24 hours to attempt to update the bank account details again. The Company may also designate a total number of edits or updates a User can carry out to the bank account details in the lifetime of the account holder.',
          '6. In the event that: (a) a User has breached the total limit to edit or update the bank account details and (b) the same bank account is used for more than ten platform accounts, the User will have to contact the customer support in order to update the bank account details again. The Company reserves the right to change this policy on editing and updating the bank account at its sole discretion.',
          '7. The Company reserves the right to block cash on delivery (COD_ payments from time to time at its sole discretion for reasons including but not limited to high product value and other such other reasons or factors (internal or external) that the Company may deem fit.',
        ],
      },
      {
        id: '3.4',
        title: '3.4 Whether Company charges User(s) for Services provided by Company on the Platform?',
        content: [
          '1. Services on Platform may require payment of charges, rate of which shall be solely at the discretion of the Company and shall be subject to User approval at the time of placing an order on the Platform. Company reserves the right to revise charges towards Service at any time at its sole discretion. The charge, applicable at any given time, will be the charge displayed at the time of purchase/booking of the respective Service (if any) by User on the Platform.',
          '2. The Company reserves the right to introduce additional chargeable services on the Platform including charges for a premium return service, cancellation charges, cash on delivery handling fees etc.',
        ],
      },
      {
        id: '3.5',
        title: '3.5 Whether for transacting on Platform, User is required to be registered under the Central or State Goods and Services Tax Legislations ("GST Laws")?',
        content: [
          '1. Company is not obligated towards any direct or indirect tax obligation of the User that may arise as a result of Users access or use of Services on the Platform. The requirement for registration and compliances under the GST Laws and other tax laws is the sole responsibility of the User including Reseller, the Company is not liable for any omissions or commissions by such User who acts in violation of the any applicable law. Accordingly, User is advised to seek independent tax advice relating to its business and/or transaction through Platform including whether it is liable for GST registration.',
        ],
      },
      {
        id: '3.6(A)',
        title: '3.6(A) What are the terms and conditions regarding the offers and benefits provided on the Platform and advertised by The Company?',
        content: [
          'a. Subject to below and unless otherwise mentioned, all product discounts and offers are by the Suppliers and not by the Company (“Supplier Offers”).',
          'b. From time to time, we may conduct various types of marketing and promotional campaigns, which may include offers including for referrals, discounts and other promotional offers to be used on our platform (“Quintal Stall Offers”).',
          'c. Quintal Stall Offers shall be subject to the terms and conditions which are solely determined by us, and the terms of such discounts and offers may vary for the customers based on factors relating to the customer such as usage of the platform, volume of transactions, time spent on the platform, city, place of residence, time, etc.',
          'd. We reserve the right to make these offer available for a limited time period, limit the value of the offer to a fixed amount or a fixed percentage determined at our discretion and to void, amend, discontinue, cancel or reject the use of any of the offers, discounts or promotional offers, including any aspect or feature of such offers at any time without any prior intimation.',
          'e. We reserve the right to decide and vary the timing and dates of the offer; the value of the offer amount, limit of the offer amount or offer percentage, the conditions subject to which the offer can be availed or will be offered, the number and category of products available for offer, at any time, subject to our absolute discretion.',
          'f. The offers, discounts and promotional offers or any terms thereof may be changed or amended from time to time.',
          'g. We reserve the right to make certain offers valid for limited inventory and subject to availability of product at the time of booking.',
          'h. Certain offers may apply only to products covered under such promotional offers. It will not be applicable to the same or similar products sold by the same Supplier or other Suppliers but not covered under offers. These offers will operate on Qunital Stall’s discretion on first-come-first served basis. Once the offer product stocks are over, you may purchase the same product on the platform outside the promotional offers available.',
          'i. Qunital Stall at its own discretion reserve the right to cancel your option to return or exchange any product purchased under offers and discounts.',
          'j. It is your responsibility to review and comply with the terms and conditions governing the offers, discounts and other promotional offers provided on our platform.',
          'k. Any of the offers, discounts or promotional offers may not be valid when used in conjunction with other promotional offers or vouchers unless explicitly permitted by us or the Supplier.',
          'l. The offers, discounts and promotional offers cannot be exchanged for cash and can only be availed in accordance with the terms and conditions of the offers, unless otherwise communicated.',
          'm. Certain offers, discounts and promotions offered such as first order discount, reactivation discount etc., may be applied at the cart level and in the event that multiple products are purchased in a single transaction, then such offer, discount, promotion may be divided and applied to each product in the cart, in a manner determined by us.',
          'n. Subject to Quintal Stall’s Cancellation and/or Return, Refund and Replacement policy, if the User: (i) cancels any product which is subject to any promotions, offer or discounts; or (ii) returns any product purchased which is subject to any promotions, offer or discounts, the User will be eligible to receive only the refund of the amount paid by the User on the purchase of such product.',
          'o. In the event, any product is cancelled or returned in accordance with Qunital Stalls Cancellation and/or Return, Refund and Replacement Policy, then save and except as provided herein, any offer, promotion, discount applied to such product shall be forfeited.',
          'p. We and/or the Supplier shall have no liability with respect to the offers, discounts and promotional offers on the Platform.',
          'q. In the event of indication of any fraudulent or suspicious behaviour or activity by you on the platform or in relation to the platform, we reserve the right at our discretion to deny to you the right to claim or participate in any offer, promotion, discount, campaign.',
        ],
      },
      {
        id: '3.6(B)',
        title: '3.6(B) What are the terms and conditions regarding the Supplier Offers?',
        content: [
          'a. Such offers shall be subject to the terms and conditions which are solely determined by us, and the terms of such discounts and offers may vary for the customers based on factors relating to the customer such as usage of the platform, volume of transactions, time spent on the platform, city, place of residence, time, etc.',
          'b. We reserve the right to make the offer available for a limited time period and to void, amend, discontinue, cancel or reject the use of any of the offers, discounts or promotional offers, including any aspect or feature of such offers at any time without any prior intimation.',
          'c. We reserve the right to vary the timing and dates of the offer; the number and category of products available for offer, at any time, subject to our absolute discretion.',
          'd. The offers, discounts and promotional offers may be changed or amended from time to time.',
          'e. We reserve the right to make certain offers valid for limited inventory and subject to availability of product at the time of booking.',
          'f. Certain offers may apply only to products covered under such promotional offers. It will not be applicable to the same or similar products sold by the same Supplier or other Suppliers but not covered under offers. These offers will operate on Qunital Stall’s discretion on first-come-first served basis. Once the offer product stocks are over, you may purchase the same product on the platform outside the promotional offers available.',
          'g. Qunital Stall at its own discretion reserve the right to cancel your option to return or exchange any product purchased under offers and discounts.',
          'h. It is your responsibility to review and comply with the terms and conditions governing the offers, discounts and other promotional offers provided on our platform.',
          'i. Any of the offers, discounts or promotional offers may not be valid when used in conjunction with other promotional offers or vouchers unless explicitly permitted by us or the Supplier.',
          'j. The offers, discounts and promotional offers cannot be exchanged for cash and can only be availed in accordance with the terms and conditions of the offers, unless otherwise communicated.',
          'k. Certain offers, discounts and promotions offered such as first order discount, reactivation discount etc., may be applied at the cart level and in the event that multiple products are purchased in a single transaction, then such offer, discount, promotion may be divided and applied to each product in the cart, in a manner determined by us.',
          'l. Subject to Qunital Stall’s Cancellation and/or Return, Refund and Replacement policy, if the User: (i) cancels any product which is subject to any promotions, offer or discounts; or (ii) returns any product purchased which is subject to any promotions, offer or discounts, the User will be eligible to receive only the refund of the amount paid by the User on the purchase of such product.',
          'm. In the event, any product is cancelled or returned in accordance with Quintal Stall’s Cancellation and/or Return, Refund and Replacement Policy, then save and except as provided herein, any offer, promotion, discount applied to such product shall be forfeited.',
          'n. We and/or the Supplier shall have no liability with respect to the offers, discounts and promotional offers on the Platform.',
        ],
      },
      {
        id: '3.7',
        title: '3.7 What are the terms and conditions governing the Qunital Stall’s Loyalty Program (“Qunital Stall Loyalty Program”) provided by Quintal Stall on the Platform?',
        content: [
          'a. Under the Quintal Stall Loyalty Program, the Eligible Users will be able to earn certain benefits and rewards in the form of virtual coins (“Virtual Coins can be of different class and value and each class having distinct value”) in accordance with the terms herein. Virtual Coins may be earned by the Eligible Users through (i) purchase of the Specified Products (as defined below); (ii) through participating and winning games/contests as organized on the Platform; (iii) or such other activities as may be determined by the Company from time to time.',
          'b. The products on which an Eligible User will be eligible and able to earn Virtual Coins shall be only such products as identified and intimated by the Company (“Specified Products”). The Company shall intimate on the Platform, the Specified Products against which Eligible Users can earn Virtual Coins, through a tag and/or any other indicator as determined by the Company.',
          'c. The Eligible Users understand and acknowledge that the amount of Virtual Coins that can be earned by an Eligible User may vary from one Specified Product to another on the Platform or from one Eligible User to another, depending upon such factors and criteria as determined by the Company at its sole discretion.',
          'd. The final amount of Virtual Coins that can be earned by the Eligible User in relation to the purchase of a Specified Product on the Platform shall be pre-disclosed and shall be displayed on the Platform.',
          'e. The Smart Coins shall be granted to the Eligible User pursuant to the purchase of a Specified Product on the Platform only after the order return window/ period for the respective Specified Product(s) in the order has expired as per Quintal Stall’s Cancellation and/or Return, Refund and Replacement policy and provided that no Specified Product(s) in the order has/have been returned by the User during such period.',
          'f. The Eligible Users shall be able to redeem Virtual Coins against purchase of such products on the Platform as determined by the Company (“Redeemable Products”) and pursuant to the redemption of the Virtual Coins (subject to Redemption Cap, as defined below), an Eligible User shall be able to obtain discount on the Redeemable Products which shall be equivalent to the value of each Virtual Coin. The value of such Virtual Coin shall be displayed to each Eligible User on the Platform, from time to time. The redemption of Virtual Coins by the Eligible User shall be in accordance with the terms herein. The maximum permitted amount of Smart Coins that can be redeemed by an Eligible User (and accordingly the amount of discount available pursuant to Virtual Coins) with respect to the purchase of a Redeemable Product on the Platform (“Redemption Cap”) shall be determined by the Company basis the cart value for the particular Redeemable Product(s). The Redemption Cap shall be such that in all events the amount of discount available pursuant to the redemption of Virtual Coins is less than the total cart value for a particular purchase of Redeemable Product(s) by an Eligible User on the Platform.',
          'g. The Eligible Users understand and acknowledge that the Redemption Cap for the Virtual Coins may vary from one Eligible User to another or from one Redeemable Product to another on the Platform. The Redemption Cap (and the maximum amount of permissible discount pursuant to redemption of Virtual Coins) shall be pre-disclosed to the Eligible User prior to redemption of Virtual Coins.',
          'h. The Eligible Users understand and acknowledge that the Virtual Coins shall lapse and expire after such period from the date Virtual Coins are earned by the Eligible User, as disclosed and intimated by the Company on the Platform (“Lapse Period”). The Lapse Period of all or any class of Virtual Coins may differ. The lapsed /expired Virtual Coins shall not be eligible to be redeemed by the Eligible User on the Platform on or after the Lapse Period.',
          'i. In the event an Eligible User cancels or returns the entire order of the Redeemable Product(s) in relation to which Virtual Coins were redeemed, then, the entire amount of Virtual Coins redeemed on such order shall be returned / reinstated and granted back to the concerned Eligible User. In the event, the Eligible User cancels or returns only certain Redeemable Product(s) from the order and not the order in its entirety, then, the proportionate amount of Virtual Coins that were redeemed on such returned or cancelled Redeemable Product(s), as applicable, shall be returned / reinstated and granted back to the Eligible User.',
          'j. The Lapse Period for the Virtual Coins shall remain unaffected on account of any returns, refunds or cancellations of the Redeemable Products made by the Eligible User as per Quintal Stall’s Cancellation and/or Return, Refund and Replacement policy. Accordingly, if any of the Redeemable Product(s) are returned or cancelled by the Eligible User in accordance with Quintal Stall’s Cancellation and/or Return, Refund and Replacement policy, the Virtual Coins will be re-instated / granted back to the Eligible User having the same Lapse Period as applicable on the date of the purchase of original Redeemable Product.',
          'k. The Virtual Coins shall be exclusive to the concerned Eligible User and shall be non-transferrable from one Eligible User to another Eligible User. Smart Coins can only be earned and redeemed on the Platform against Specified Products and Redeemable Products respectively, and not on any third-party outlet, offline or online (including website, platform or application).',
          'l. The Virtual Coins cannot be converted into cash or anything of tangible or monetary value. The Eligible Users are not eligible to withdraw any cash against the Virtual Coins available with them and the Virtual Coins in no event permit any sort of cash withdrawal. The Eligible Users shall not be eligible to purchase any Virtual Coins through cash or kind.',
          'm. The Virtual Coins cannot be solely used for purchase of the Redeemable Product(s) on Platform in lieu of cash and at all times Virtual Coins shall be subject to the Redemption Cap.',
          'n. The Company reserves the right to suspend or disqualify (temporarily or permanently) an Eligible User from the Loyalty Program (including earning / redemption of any Virtual Coins on the Platform) if: (i) any fraudulent or abusive activity is identified as being carried out for the purpose of or in connection with Virtual Coins or otherwise; or (ii) if the Eligible User has violated the Agreement or applicable laws. The decision of the Company shall be final and binding on the Eligible User and the disqualification may result in immediate cancellation of all Virtual Coins of the Eligible User, without any liability or obligation whatsoever on part of the Company.',
          'o. The Company reserves the right to suspend the issue of Virtual Coins and the continuation of the Loyalty Program with respect to certain category of Eligible Users or to all Eligible Users temporarily or permanently at any time, with or without notice, and without assigning any reason.',
          'p. The Company reserves the right at any time to modify, withdraw or terminate the Loyalty Program including any feature or aspect thereunder at its sole discretion, with or without any notice and without any liability or obligation in this regard (including without limitation on account of any queries or concerns raised by any regulatory authority or for ensuring compliance with applicable laws) in which case there shall not be any liability upon the Company to allow any Eligible User an opportunity to use / redeem all or any Virtual Coins and the Eligible Users shall have no entitlement with respect to redemption in such case).',
          'q. Without prejudice to the foregoing paragraph, the Company reserves the right in its discretion to amend, modify or withdraw any feature or aspect of the Loyalty Program at any time (on one or more occasions) with or without any notice to any User, including without limitation following aspects: (i) the nature, type, categories and the relevant Specified Products on which the Eligible',
          'r. Users can earn Virtual Coins, (ii) the criteria which determines the number of Virtual Coins that can be earned on a particular Specified Product, (iii) Redemption Cap and the basis for the determination of the Redemption Cap for the Virtual Coins in connection with Redeemable Products; (iv) the mode and manner of the redemption of Virtual Coins including the sources / avenues at which Virtual Coins can be redeemed by the Eligible User; and/or (v) the Lapse Period. r. The Company disclaims all liability that may arise or any losses that may be incurred by an Eligible User in connection with or arising out of the Loyalty Program.',
          's. In the event of termination of relationship between an Eligible User and the Company, there shall not be any refund in relation to the Virtual Coins and all Virtual Coins with the Eligible User in such an event shall lapse (without any further act or deed) and the Eligible User shall not have any entitlement to use/redeem those Virtual Coins which were outstanding with him/her.',
          't. The Loyalty Program and the Virtual Coins granted hereunder are purely in the nature of benefits intended to be granted to the Eligible Users and the same is not a Prepaid Payment Instrument (PPI) / wallet or any other payment mode / payment instrument as understood under Indian payment and settlement systems laws as well as notifications and directions issued by the Reserve Bank of India.',
          'u. The Eligible Users understand and acknowledge that their participation in the Loyalty Program and in connection with the earning and/or redemption of the Virtual Coins shall in all events be subject to compliance by the Eligible User of the applicable laws.',
          'v. The Company reserves the right to provide the Loyalty Program to only a select number of Users on the basis of such factors and eligibility criteria as may be deemed relevant and determined by the Company, at its sole discretion (“Eligible Users”).',
        ],
      },
    ],
  },
  {
    id: '4',
    title: '4. USE OF THE PLATFORM',
    children: [
      {
        id: '4.1',
        title: '4.1 Can User access and use the Platform at any time or could there be any limitations?',
        content: [
          '1. Company endeavours to make the Application available 24X7. However, the Company does not represent that access to the Application will be uninterrupted, timely, error free, free of viruses or other harmful components or that such defects will be corrected.',
          '2. Users understand and acknowledge that the use of Application requires internet connectivity and telecommunication links. Users shall bear the costs incurred to access and use the Application and avail Services, and Company shall not, under any circumstances whatsoever, be responsible or liable for such costs.',
          '3. Company does not warrant that Application will be compatible with all hardware and software which is used by Users.',
          '4. Application may be under constant upgrades, and some functions and features may not be fully operational. Application is provided on an "as is" and "as available" basis. Company expressly disclaims all warranties of any kind, whether express or implied with respect to the records and other data that is made available by it to Users.',
          '5. Users shall be solely responsible for damages to their data system or for loss of data arising from download of content from Application. No guidance or information, written or oral, obtained from Company or via Platform, shall constitute any warranty, unless stated otherwise.',
          ,
        ],
      },
      {
        id: '4.2',
        title: '4.2 Does the Company guarantee performance of the agreement or other arrangements inter se between User(s) or otherwise in respect of products on Platform?',
        content: [
          '1. Company, through Platform, is a mere facilitator of the transaction including among Supplier, User and delivery agent and is not responsible for any non-performance or breach of any contract entered into towards User Transactions. The Company cannot and does not guarantee that the concerned Suppliers will perform any transaction concluded on the Platform. The Company shall not and is not required to mediate or resolve any dispute or disagreement between the Users concerned including with any other third party.',
          '2. The Company does not represent any of the Users or the Suppliers, and disclaims any liability with respect to any error or inconsistency with respect to any information relating to such Suppliers or Users displayed on the Platform.',
          '3. The Company does not make any representation or warranty as to the item-specifics (such as legal title, creditworthiness, identity, etc.) of any of its Users. Company shall not be liable for any misuse of information shared by Users with it; or through the Users profile; or with a third party on the Platform, chat rooms, forums, or comments.',
          '4. Users acknowledge and agree that the Company is not an arbitrator or judge of disputes concerning. property and it cannot, by any means, verify that any Supplier or Wholesaler or Reseller selling or supplying merchandise on/through the Platform have the right to sell the products. Company encourages Users to assist it in identifying listings on the Platform, which, according to the Users’ knowledge or belief infringe their rights or third-party rights.',
          '5. Company does not at any point of time during any transaction between any Supplier and a User take possession of any product offered nor does it at any point gain title to or have any rights or claims over such products. At no time shall the Company hold any right, title or interest over the products, nor shall the Company have any obligations or liabilities in respect of such contract entered into between the Users. Company is not responsible for damages or delays as a result of products which are out of stock, unavailable or back ordered.',
        ],
      },
      {
        id: '4.3',
        title: '4.3 Whether the use of Platform (a) is restricted in any manner; and (b) requires any generic compliances from User?',
        content: [
          '1. User should not use the Platform to host, display, upload, download, modify, publish, transmit, update, or share any information which:',
          '1. belongs to another person and to which the User does not have a right whatsoever;',
          '2. is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libellous, slanderous, criminally inciting or invasive of another’s privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatsoever; or unlawfully threatening or unlawfully harassing including but not limited to “indecent representation of women” within the meaning of the Indecent Representation of Women (Prohibition) Act, 1986;',
          '3. is patently offensive to the online community, such as sexually explicit content, or content that promotes obscenity, paedophilia, racism, bigotry, hatred or physical harm of any kind against any group or individual;',
          '4. is harmful to a child or a minor;',
          '5. harasses or advocates harassment of another person;',
          '6. infringes upon or violates any third party’s rights including, but not limited to, intellectual property rights, rights of privacy (including without limitation unauthorized disclosure of a person’s name, image, email address, physical address or phone number) or rights of publicity including any unauthorised use or posting any third partys social media image without such owners consent;',
          '7. promotes an illegal or unauthorized copy of another person’s copyrighted work, such as providing pirated computer programs or links to them, providing information to circumvent manufacture-installed copy-protect devices;',
          '8. tries to gain unauthorized access or exceeds the scope of authorized access to the Application or to the profiles, blogs, communities, account information, or other areas of the Application or solicits passwords or personal identifying information for commercial or unlawful purposes from other Users;',
          '9. interferes with another User’s use and enjoyment of the Platform or any third party users enjoyment of similar services;',
          '10. refers to any website or URL that, in our sole discretion, contains material that is inappropriate for the Platform or any other website, contains content that would be prohibited or violates the spirit of these Terms;',
          '11. violates any law for the time being in force;',
          'XII. deceives or misleads the addressee about the origin of the message or knowingly and intentionally communicates any information which is patently false or misleading in nature but may reasonably be perceived as a fact, including creation of a false identity for the purpose of misleading others;',
          '1. impersonates another person;',
          '2. threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, threatens public order, or causes incitement to the commission of any cognisable offence or prevents investigation of any offence or insulting other nations.',
          '3. Contains software viruses or other computer programming routines that may damage, detrimentally interfere with, diminish value of, surreptitiously intercept or expropriate any system, data, or personal information; and',
          '4. directly or indirectly, offers, attempts to offer, trades, or attempts to trade in any item, dealing of which is prohibited or restricted in any manner under the provisions of any applicable law, rule, regulation or guideline for the time being in force.',
          'XVII. is patently false and untrue, and is written or published in any form, with the intent to mislead or harass a person, entity, or agency for financial gain or to cause any injury to any person.',
          '1. When accessing or using the Platform or availing the Services, the User has to comply with and ensure the following:',
          '1. All registration information submitted by User is truthful, lawful and accurate;',
          '2. Users use of the Application/Platform shall be solely for their use and they shall not authorize others to use their account;',
          '3. User does not submit, post, upload, distribute, or otherwise make available or transmit any information that: (i) is defamatory, abusive, harassing, insulting, threatening, or that could be deemed to be stalking or constitute an invasion of a right of privacy of another person; (ii) is bigoted, hateful, or racially or otherwise offensive; (iii) is violent, vulgar, obscene, pornographic or otherwise sexually explicit; (iv) is illegal or encourages or advocates illegal activity or the discussion of illegal activities with the intent to commit them;',
          '4. All necessary licenses, consents, permissions and rights are owned by Users and there is no need for any payment or permission or authorization required from any other party or entity to use, distribute or otherwise exploit in all manners permitted by the Agreement, all trademarks, copyrights, patents, trade secrets, privacy and publicity rights and/or other proprietary rights contained in any content that Users submit, post, upload, distribute or otherwise transmit or make available;',
          '5. User will not use Platform in any way that is unlawful, or harms the Company or any other person or entity;',
          '6. User will not post, submit, upload, distribute, or otherwise transmit or make available any software or other computer files that contain a virus or other harmful component, or otherwise impair or damage the Platform or any connected network, or otherwise interfere with any person or entity’s use or enjoyment of Application;',
          '7. User will not use another person’s username, password or other account information, or another person’s name, likeness, voice, image or photograph or impersonate any person or entity or misrepresent your identity or affiliation with any person or entity;',
          '8. User will not or attempt to delete or modify any content of Platform, including but not limited to, disclaimers or proprietary notices such as copyright or trademark symbols, logos;',
          '9. User will not post or contribute any information or data that may be obscene, indecent, pornographic, vulgar, profane, racist, sexist, discriminatory, offensive, derogatory, harmful, harassing, threatening, embarrassing, malicious, abusive, hateful, menacing, defamatory, untrue or political or contrary to our interest;',
          '10. User shall not access Platform without authority or use Platform in a manner that damages, interferes or disrupts, any part of Platform or any equipment or any network on which Platform is stored or any equipment of any third party;',
          '11. User shall not attempt to gain unauthorized access to any portion or feature of the Application, or any other systems or networks connected to the Platform by any means. User shall not probe, scan, or test the vulnerability of Platform nor breach the security or authentication measures on Platform or any network connected to Platform.',
          '12. User agrees not to use any device, software or routine to interfere or attempt to interfere with the proper working of Platform or any transaction being conducted on Platform, or with any other person’s use of Platform. User may not use Platform or any of its content for any purpose that is unlawful or prohibited by this Agreement.',
          '13. User shall at all times ensure full compliance with the applicable law, as amended from time to time, including that of (i) the Information Technology Act, 2000 and the rules thereunder; (ii) all applicable domestic laws, rules and regulations (including the provisions of any applicable exchange control laws or regulations in force); and (iii) international laws, foreign exchange laws, statutes, ordinances and regulations (including, but not limited to Direct and Indirect Taxes applicable as per current statue in the country) regarding the use of the Application and listing, purchase, solicitation of offers to purchase, and sale of products or Services. User shall not engage in any transaction which is prohibited by the provisions of any applicable law including exchange control laws or regulations for the time being in force.',
          '14. In order to allow Company to use the information supplied by the Users, without violating any rights or any laws, Users agree to grant Company a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sub-licensable (through multiple tiers) right to exercise the copyright, publicity, database rights or any other rights. Company will only use the information in accordance with this Agreement, applicable to use of Platform and for provision of Services.',
          '2. Company shall at times and at their sole discretion reserve the right to disable any user identification code or password if any User has failed to comply with any of the provisions of this Agreement. Company shall have all the rights to take necessary action and claim damages that may occur due to Users involvement/participation in any way either on their own or through group/s of people, intentionally or unintentionally in hacking.',
        ],
      },
    ],
  },
];



const TableOfContents = ({ sections, activeSection, setActiveSection }) => {
  const renderTocItems = (items, level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <ListItem disablePadding sx={{ pl: level * 2 }}>
          <ListItemButton
            selected={activeSection === item.id}
            onClick={() => setActiveSection(item.id)}
            sx={{
              pl: 2 + level * 2,
              py: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                borderLeft: '3px solid',
                borderColor: 'primary.main',
              },
            }}
          >
            <ListItemText
              primary={item.title.split(' ')[0] + ' ' + item.title.split(' ').slice(1).join(' ')}
              primaryTypographyProps={{
                fontSize: level === 0 ? '0.95rem' : '0.85rem',
                fontWeight: level === 0 ? 600 : 400,
              }}
            />
          </ListItemButton>
        </ListItem>
        {item.children && (
          <Collapse in={activeSection.startsWith(item.id.split('.')[0])} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderTocItems(item.children, level + 1)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Paper elevation={0} sx={{ p: 2, position: 'sticky', top: 20 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Table of Contents
      </Typography>
      <List dense sx={{ py: 0 }}>
        {renderTocItems(sections)}
      </List>
    </Paper>
  );
};

const TermSection = ({ section, level = 0 }) => {
  const [expanded, setExpanded] = useState(level === 0);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getFontSize = () => {
    switch (level) {
      case 0: return '1.25rem';
      case 1: return '1.1rem';
      case 2: return '1rem';
      default: return '0.95rem';
    }
  };

  return (
    <Box
      id={section.id}
      sx={{
        pl: level > 0 ? 3 : 0,
        mb: level === 0 ? 4 : 3,
        borderLeft: level > 0 ? `2px solid ${theme.palette.divider}` : 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          cursor: level > 0 ? 'pointer' : 'default',
        }}
        onClick={level > 0 ? handleExpandClick : undefined}
      >
        {level > 0 && (
          <IconButton
            size="small"
            sx={{ mr: 1, mt: 0.5 }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {expanded ? <ExpandLessIcon fontSize="inherit" /> : <ExpandMoreIcon fontSize="inherit" />}
          </IconButton>
        )}
        <Typography
          sx={{
            fontWeight: level === 0 ? 700 : 600,
            fontSize: getFontSize(),
            color: level === 0 ? theme.palette.primary.main : 'text.primary',
            flexGrow: 1,
          }}
        >
          {section.title}
        </Typography>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {section.content && section.content.map((text, idx) => (
          <Typography
            key={idx}
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: '0.95rem', mb: 2, mt: level > 0 ? 0.5 : 1 }}
          >
            {text}
          </Typography>
        ))}

        {section.children && section.children.map((child) => (
          <TermSection key={child.id} section={child} level={level + 1} />
        ))}
      </Collapse>
    </Box>
  );
};


const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('acceptance');
  const theme = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{ py: 6, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{xs:12, md:3}}>
            <TableOfContents 
              sections={termsData} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </Grid>
          <Grid size={{xs:12 ,md:9}}>
            <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, backgroundColor: '#fff' }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 'bold', color: 'error.main', mb: 3 }}
              >
                Terms and Conditions
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, fontSize: '1.05rem' }}
              >
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Please read these terms and conditions ("Terms") carefully before accessing or using the Platform (defined hereinafter). These Terms along with the Privacy Policy published on the Platform ("Privacy Policy") and other policies (as may be notified/displayed/published on the Platform) constitutes the contract between the Users of this Platform and the Company (collectively "Agreement"). By use of the Platform, Users agree to be bound by these Agreement as posted on the Platform from time to time.
              </Typography>

              <Divider sx={{ mb: 4 }} />

              {termsData.map((section) => (
                <TermSection key={section.id} section={section} />
              ))}

              <Box sx={{ mt: 6, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  If you have any questions about these Terms and Conditions, please contact us at:
                </Typography>
                <Link href="mailto:legal@example.com" color="primary">
                  legal@example.com
                </Link>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ position: 'fixed', bottom: 32, right: 32 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={scrollToTop}
            startIcon={<ArrowUpwardIcon />}
            sx={{
              borderRadius: '50%',
              minWidth: 0,
              width: 56,
              height: 56,
              boxShadow: 3,
            }}
            aria-label="scroll to top"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;