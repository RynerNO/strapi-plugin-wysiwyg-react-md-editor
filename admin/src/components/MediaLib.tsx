import PropTypes from 'prop-types';
import { useStrapiApp } from '@strapi/strapi/admin';
import type { Schema } from '@strapi/types';

function prefixFileUrlWithBackendUrl ( fileURL:string ) {
  return !!fileURL && fileURL.startsWith('/') ? `${ (window as any).strapi.backendURL }${ fileURL }` : fileURL;
};




const MediaLib = ( { isOpen = false, onChange = (formattedFiles: { alt: any; url: string; mime: any; }[]) => {}, onToggle = () => {} } ) => {
  const { components } = useStrapiApp( 'library', app => app );
  const MediaLibraryDialog = components[ 'media-library' ] as unknown as React.FunctionComponent<{
    onClose: () => void
    onSelectAssets: () => void
  }>;

  const handleSelectAssets = (images: Schema.Attribute.MediaValue<true>) => {
    const formattedFiles = images.map(f => ( {
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl( f.url ),
      mime: f.mime,
    } ) );

    onChange( formattedFiles );
  };

  if ( !isOpen ) {
    return null
  };

  return(
    
    <MediaLibraryDialog onClose={ onToggle } onSelectAssets={ handleSelectAssets } />
  );
};

MediaLib.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
};

export default MediaLib;