// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React, {memo} from 'react';
import {FormattedMessage} from 'react-intl';
import {Tooltip} from 'react-bootstrap';

import Post from '../../post_view/post/post';

import './file_preview_header.scss';
import OverlayTrigger from '../../overlay_trigger';
import Constants from '../../../utils/constants';
import FilePreviewModalInfo from '../file_preview_modal_info/file_preview_modal_info';
import FilePreviewModalMainNav from "../file_preview_modal_main_nav/file_preview_modal_main_nav";

interface DownloadLinkProps {
    download?: string;
}

interface Props {
    fileIndex: number;
    totalFiles: number;
    filename: string;
    post: React.ComponentProps<typeof Post>;
    fileURL: string;
    showPublicLink?: boolean;
    enablePublicLink: boolean;
    canDownloadFiles: boolean;
    isExternalFile: boolean;
    onGetPublicLink?: () => void;
    handlePrev: () => void;
    handleNext: () => void;
    handleModalClose: () => void;
    children?: string;
    disabled?: boolean;
    className?: string;
}

const FileViewHeader: React.FC<Props> = (props: Props) => {
    const closeButton = (
        <OverlayTrigger
            delayShow={Constants.OVERLAY_TIME_DELAY}
            key='publicLink'
            placement='bottom'
            overlay={
                <Tooltip id='close-icon-tooltip'>
                    <FormattedMessage
                        id='full_screen_modal.close'
                        defaultMessage='Close'
                    />
                </Tooltip>
            }
        >
            <button
                className='file-preview-header__action-item'
                onClick={props.handleModalClose}
            >
                <i className='icon icon-close'/>
            </button>
        </OverlayTrigger>
    );
    const publicLink = (
        <OverlayTrigger
            delayShow={Constants.OVERLAY_TIME_DELAY}
            key='filePreviewPublicLink'
            placement='bottom'
            overlay={
                <Tooltip id='link-variant-icon-tooltip'>
                    <FormattedMessage
                        id='view_image_popover.publicLink'
                        defaultMessage='Get a public link'
                    />
                </Tooltip>
            }
        >
            <a
                href='#'
                className='file-preview-header__action-item'
                onClick={props.handleModalClose}
            >
                <i className='icon icon-link-variant'/>
            </a>
        </OverlayTrigger>
    );
    const downloadLinkProps: DownloadLinkProps = {};
    downloadLinkProps.download = props.filename;
    const download = (
        <OverlayTrigger
            delayShow={Constants.OVERLAY_TIME_DELAY}
            key='download'
            placement='bottom'
            overlay={
                <Tooltip id='download-icon-tooltip'>
                    <FormattedMessage
                        id='view_image_popover.download'
                        defaultMessage='Download'
                    />
                </Tooltip>
            }
        >
            <a
                href={props.fileURL}
                className='file-preview-header__action-item'
                target='_blank'
                rel='noopener noreferrer'
                {...downloadLinkProps}
            >
                <i className='icon icon-download-outline'/>
            </a>
        </OverlayTrigger>
    );

    return (
        <div className='file-preview-header'>
            <FilePreviewModalInfo
                post={props.post}
                filename={props.filename}
            />
            <FilePreviewModalMainNav
                totalFiles={props.totalFiles}
                fileIndex={props.fileIndex}
                handlePrev={props.handlePrev}
                handleNext={props.handleNext}
            />
            <div className='file-preview-header__actions'>
                {publicLink}
                {download}
                {closeButton}
            </div>
        </div>
    );
};

export default memo(FileViewHeader);

