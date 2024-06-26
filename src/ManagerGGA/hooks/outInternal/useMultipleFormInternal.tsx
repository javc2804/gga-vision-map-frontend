import { useState } from "react";

export const useMultipleFormInternal = (initialForm: any) => {
  const [forms, setForms] = useState([initialForm]);

  const addForm = () => {
    setForms((currentForms) => [...currentForms, { ...initialForm }]);
  };

  const removeForm = (index: any) => {
    setForms((currentForms) => currentForms.filter((_, i) => i !== index));
  };

  const handleFormChange = (index: any, event: any) => {
    const { name, value } = event.target;
    console.log(index);
    console.log(name);
    console.log(value);
    setForms((currentForms) =>
      currentForms.map((form, i) =>
        i === index ? { ...form, [name]: value } : form
      )
    );
  };

  return { forms, addForm, removeForm, handleFormChange, setForms };
};
