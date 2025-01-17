/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import { observer } from 'mobx-react'
import { Modal } from 'components/Base'
import CodeEditor from 'components/Base/CodeEditor'

import styles from './index.scss'

@observer
export default class Shell extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.state = { value: '' }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.edittingData.type === 'script') {
      const value = get(nextProps.edittingData.data, '[0].value', '')
      return { value, initValue: value }
    }
    return null
  }

  handleChange = value => {
    this.isInputed = true
    this.newValue = value
  }

  handleOk = () => {
    const { initValue } = this.state
    this.props.onAddStep({
      name: 'script',
      arguments: [
        {
          key: 'scriptBlock',
          value: this.isInputed ? this.newValue : initValue,
        },
      ],
    })
  }

  render() {
    const { visible, onCancel } = this.props
    const { value } = this.state
    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('script')}
      >
        <CodeEditor
          className={styles.CodeEditor}
          name="script"
          mode="yaml"
          value={value}
          onChange={this.handleChange}
        />
      </Modal>
    )
  }
}
