import { Component } from 'react';
import PropTypes from 'prop-types';

import withWidth, { SMALL } from 'helpers/with-width';
import { Form } from 'components';

const schema = {
  "title": "",
  "type": "object",
  "properties": {
    "username": {
      "type": "string", 
      "title": "Username*",
      "required": true,
    },
    "roles": {
      "type" : "array",
      "title" : "",
      "items": {
        "type": "string",
        "title": "Role",
        "enum": [ "user", "admin" ],
        "required": true,
      },
    },
    "password1": {
      "type": "string", 
      "title": "Password*",
    },
    "password2": {
      "type": "string", 
      "title": "Confirm Password*",
    },
  }
};

const uiSchema = {
  "roles" : {
    "classNames" : "col-xs-12",
    "ui:options": {
      "addable": false,
      "orderable": false,
      "removable": false
    }
  },
  "username" : {
    "classNames" : "col-xs-12",
  },
  "password1" : {
    "classNames" : "col-xs-6",
    "ui:widget": "password",
  },
  "password2" : {
    "classNames" : "col-xs-6",
    "ui:widget": "password",
  },
}

class Edit extends Component {
  static propTypes = {
    visible: PropTypes.bool, 
    action: PropTypes.string, 
    formData: PropTypes.object,
    isLoading: PropTypes.bool,
    validate: PropTypes.func, 
    onHide: PropTypes.func, 
    onSubmit: PropTypes.func,
    onError: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = this.getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  }

  getStateFromProps(props) {
    const { 
      action,
      width,
      formData,
    } = props;

    let state = {
      schema,
      uiSchema,
      formData,
    };

    if (action === 'update') {
      state.uiSchema = Object.assign(state.uiSchema, {
        "username": {
          "ui:disabled": true
        }
      });
    } else if (width !== SMALL) {
      state.uiSchema = Object.assign(state.uiSchema, {
        "username": {
          "ui:autofocus": true
        }
      });
    }

    return state;
  }

  render() {
    const {
      visible,
      action,
      isLoading,
      validate,
      onHide,
      onSubmit,
      onError
    } = this.props;

    const {
      formData
    } = this.state;

    return (
      <Form 
        visible={visible}
        title={(action === 'update') ? 'Edit Account' : 'Create Account'}
        width="480px"
        height="400px"
        schema={this.state.schema}
        uiSchema={this.state.uiSchema}
        formData={formData}
        isLoading={isLoading}
        validate={validate}
        onHide={onHide}
        onSubmit={onSubmit}
        onError={onError}/>
    )
  }
}

export default withWidth()(Edit);
