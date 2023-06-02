import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import sysJobApi from 'api/hzsskl/sysJob';

const Detail = (props) => {
  const [formData, setFormData] = useState({});

  const { pkInfo } = props;

  useEffect(() => {
    sysJobApi.detail(pkInfo).then((res) => {
      let data = res.data.data;
      if (data) {
        setFormData(data);
      }
    });
  }, []);

  return <Descriptions title="" column={{ xs: 1, sm: 1, md: 2 }}></Descriptions>;
};
export default Detail;
