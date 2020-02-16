import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialMail } from 'modules/stores/utils';
import ContactForm from 'components/profile/contact/ContactForm';

const ContactFormContainer = () => {
  const dispatch = useDispatch();
  const { mailResult } = useSelector(({ utils }) => ({
    mailResult: utils.mailResult,
  }));

  useEffect(() => {
    return () => {
      dispatch(initialMail());
    };
  }, [dispatch]);

  return (
    <>
      <ContactForm mailResult={mailResult} />
    </>
  );
};

export default ContactFormContainer;
