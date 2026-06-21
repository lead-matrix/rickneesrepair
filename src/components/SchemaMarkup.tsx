import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { servicesData, citiesData } from '../data/seoData';

export const SchemaMarkup: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    // Remove existing injected schema script tags
    const existingScripts = document.querySelectorAll('script[data-schema-markup]');
    existingScripts.forEach(el => el.remove());

    const schemas: object[] = [];

    // 1. Core Organization Schema
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://rickneesrepair.com/#organization',
      'name': 'Rick Nees Appliance Repair',
      'url': 'https://rickneesrepair.com',
      'logo': 'https://rickneesrepair.com/assets/logo.png', // Fallback URL
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+1-316-213-1874',
        'contactType': 'customer service',
        'areaServed': 'US-KS',
        'availableLanguage': 'en'
      }
    };
    schemas.push(orgSchema);

    // 2. Core LocalBusiness Schema
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://rickneesrepair.com/#localbusiness',
      'name': 'Rick Nees Appliance Repair',
      'image': 'https://rickneesrepair.com/assets/hero-tech.jpg', // Placeholder
      'telephone': '+1-316-213-1874',
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Wichita Area Service',
        'addressLocality': 'Wichita',
        'addressRegion': 'KS',
        'postalCode': '67202',
        'addressCountry': 'US'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 37.6872,
        'longitude': -97.3301
      },
      'url': 'https://rickneesrepair.com',
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        'opens': '07:00',
        'closes': '21:00'
      },
      'sameAs': [
        'https://www.facebook.com/rickneesrepair', // Mock FB
        'https://g.page/rickneesrepair' // Mock Google
      ]
    };
    schemas.push(localBusinessSchema);

    // 3. WebSite Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'url': 'https://rickneesrepair.com',
      'name': 'Rick Nees Appliance Repair',
      'publisher': {
        '@id': 'https://rickneesrepair.com/#organization'
      }
    };
    schemas.push(websiteSchema);

    // 4. Page Specific Schemas
    // Breadcrumbs
    const pathSegments = path.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const breadcrumbList = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://rickneesrepair.com/'
          },
          ...pathSegments.map((segment, idx) => {
            const currentPath = `/${pathSegments.slice(0, idx + 1).join('/')}`;
            const name = segment.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            return {
              '@type': 'ListItem',
              'position': idx + 2,
              'name': name,
              'item': `https://rickneesrepair.com${currentPath}`
            };
          })
        ]
      };
      schemas.push(breadcrumbList);
    }

    // Services Subpages Schema
    if (path.startsWith('/services/') && pathSegments[1]) {
      const serviceId = pathSegments[1];
      const service = servicesData.find(s => s.id === serviceId);
      if (service) {
        // Service Schema
        const serviceSchema = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          'name': `${service.name} in Wichita`,
          'serviceType': service.name,
          'provider': {
            '@id': 'https://rickneesrepair.com/#localbusiness'
          },
          'areaServed': {
            '@type': 'AdministrativeArea',
            'name': 'Wichita Metropolitan Area'
          },
          'description': service.fullDesc
        };
        schemas.push(serviceSchema);

        // FAQ Schema if present
        if (service.faqs && service.faqs.length > 0) {
          const faqSchema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': service.faqs.map(f => ({
              '@type': 'Question',
              'name': f.q,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': f.a
              }
            }))
          };
          schemas.push(faqSchema);
        }
      }
    }

    // Cities Subpages Schema
    if (path.startsWith('/cities/') && pathSegments[1]) {
      const cityId = pathSegments[1];
      const city = citiesData.find(c => c.id === cityId);
      if (city) {
        const serviceSchema = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          'name': `Appliance Repair in ${city.name}, KS`,
          'serviceType': 'Appliance Repair',
          'provider': {
            '@id': 'https://rickneesrepair.com/#localbusiness'
          },
          'areaServed': {
            '@type': 'City',
            'name': city.name,
            'state': 'KS'
          },
          'description': city.intro
        };
        schemas.push(serviceSchema);

        if (city.faq && city.faq.length > 0) {
          const faqSchema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': city.faq.map(f => ({
              '@type': 'Question',
              'name': f.q,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': f.a
              }
            }))
          };
          schemas.push(faqSchema);
        }
      }
    }

    // Inject scripts into document head
    schemas.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema-markup', 'true');
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

  }, [path]);

  return null; // Side-effect only component
};
export default SchemaMarkup;
