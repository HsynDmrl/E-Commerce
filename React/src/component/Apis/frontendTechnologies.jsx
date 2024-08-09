import React from 'react';
import Container from 'react-bootstrap/Container';

const FrontendTechnologies = () => {
  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
        <span>React: Kullanıcı arayüzleri oluşturmak için kullanılan bir JavaScript kütüphanesi.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*AJpFZrofvxMn3MHh9p3i_Q.jpeg" alt="@reduxjs/toolkit" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
        <span>Redux - toolkit: Redux durum yönetimini kolaylaştıran araç seti.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*cQ8JTEvKMKaBhovYI2mncQ.png" alt="axios" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
        <span>Axios: HTTP isteklerini yapmak için kullanılan bir kütüphane.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*canjYc3MSeJ86HHys15yiQ.png" alt="formik" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
        <span>Formik: Formları yönetmek ve doğrulamak için kullanılan bir kütüphane.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ZSIihImW6DeVOYwUL-ghfQ.png" alt="react-bootstrap" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
        <span>React-bootstrap: Bootstrap bileşenlerini React uygulamalarında kullanmayı sağlar.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src="https://raw.githubusercontent.com/react-icons/react-icons/master/react-icons.svg" alt="react-icons" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
        <span>React-icons: React projelerinde kullanılabilecek ikonlar sağlayan bir kütüphane.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src="https://banner2.cleanpng.com/20180511/zie/kisspng-redux-react-javascript-vue-js-single-page-applicat-5af5cde3d3a5e8.2671715915260584678669.jpg" alt="react-redux" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
        <span>React-redux: React ve Redux'u birlikte kullanmayı kolaylaştıran kütüphane.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*XKLChdbn3_aAXYuL.png" alt="react-router-dom" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
        <span>React-router-dom: React uygulamalarında istemci tarafı yönlendirme sağlar.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8nhs5ag554rdv716276o.png" alt="yup" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
        <span>Yup: JavaScript nesneleri ve form doğrulaması için kullanılan bir kütüphane.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/800px-Bootstrap_logo.svg.png" alt="bootstrap" style={{ width: '150px', height: '60px', marginRight: '10px' }} />
        <span>Bootstrap: Modern ve duyarlı web siteleri oluşturmak için kullanılan bir CSS framework'ü.</span>
      </div>
    </Container>
  );
};

export default FrontendTechnologies;
