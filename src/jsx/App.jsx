import React, {
  useEffect, useRef, useState
} from 'react';
import '../styles/styles.less';

// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from 'uuid';
// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import IsVisible from 'react-is-visible';

// Load helpers.
function App() {
  const [data, setData] = useState(false);
  const appRef = useRef();
  const mapRef = useRef();
  const mapContRef = useRef();

  const [offset, setOffset] = useState(0);
  // eslint-disable-next-line
  const [mapOffset, setMapOffset] = useState(0);

  const preloadImage = (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
  };

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mapContTop = mapContRef.current?.getBoundingClientRect().top || window.innerHeight;
    const mapContHeight = mapContRef.current?.getBoundingClientRect().height || 0;
    const mapHeight = mapRef.current?.getBoundingClientRect().height || 0;
    if (mapRef.current) {
      if (offset > mapContHeight + mapHeight) {
        mapRef.current.classList.add('absolute');
        mapRef.current.classList.remove('fixed');
        setMapOffset(false);
      } else if (mapContTop < 0) {
        mapRef.current.classList.add('fixed');
        mapRef.current.classList.remove('absolute');
        setMapOffset(0);
      } else {
        mapRef.current?.classList.add('absolute');
        mapRef.current?.classList.remove('fixed');
        setMapOffset(0);
      }
    }
  }, [offset]);

  useEffect(() => {
    const getDataPath = () => {
      if (window.location.href.includes('github')) return './assets/data/';
      if (process.env.NODE_ENV === 'production') return 'https://lusi-dataviz.ylestatic.fi/2023-05-mekong/assets/data';
      return 'assets/data';
    };

    for (let i = 1; i <= 12; i++) {
      preloadImage(`https://lusi-dataviz.ylestatic.fi/2023-05-mekong/assets/img/mekong_kartta_${i}.jpg`);
    }

    try {
      Promise.all([
        fetch(`${getDataPath()}/2023-05-mekong_data.json`)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.text();
          })
          .then(body => setData(JSON.parse(body))),
      ]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const changeVisible = (i) => {
    if (mapRef.current.classList.value.includes('fixed')) {
      mapRef.current.classList.value = `map fixed page${i}`;
    } else if (mapRef.current.classList.value.includes('absolute')) {
      mapRef.current.classList.value = `map absolute page${i}`;
    }
  };

  return (
    <div className="app" ref={appRef}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringilla finibus erat vel dictum. Ut eleifend, lorem et pretium mollis, ligula orci viverra augue, id posuere tellus nibh sed lectus. Etiam ipsum nunc, pellentesque vitae blandit et, volutpat fermentum diam. Nulla at tincidunt enim. Pellentesque cursus feugiat leo, nec pharetra neque venenatis sit amet. Praesent tincidunt vel diam at iaculis. Nulla vitae scelerisque purus, at suscipit augue. Nunc aliquam massa non justo consectetur, a gravida sapien dignissim. Sed dignissim elit eu lacus mattis, nec dictum nunc luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra aliquam ligula sit amet elementum. Donec ac efficitur ante. Phasellus rhoncus magna eget feugiat volutpat. Donec in pellentesque lectus, ac pulvinar mi. Ut sit amet tincidunt sem, nec commodo arcu.</p>
      <p>Ut imperdiet velit dolor, et congue nisl egestas eu. Phasellus ac purus a risus fringilla ullamcorper eu vel ante. Etiam arcu tellus, elementum id nibh at, auctor porta quam. Curabitur sit amet mollis nisi. Maecenas gravida varius odio, ut porta enim scelerisque eu. Curabitur pharetra viverra diam, pharetra fringilla tellus dapibus sit amet. Integer sed pretium felis. Etiam tortor nisl, semper ac felis quis, tempor eleifend risus. Nullam hendrerit ullamcorper turpis et auctor. Phasellus pretium nulla ut tincidunt sollicitudin. Nam a est et nunc euismod pellentesque in sed mi. Etiam quis nunc consectetur, convallis risus sed, mattis est. Suspendisse quis viverra ex. Maecenas ullamcorper ornare nisl mollis hendrerit. Praesent placerat interdum lorem, sit amet rhoncus augue consectetur eget.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>

      {
        data && (
          <div className="map_container" ref={mapContRef}>
            <div className="map_texts_container">
              <div className="map absolute" ref={mapRef} style={(mapOffset !== false) ? { top: mapOffset } : { bottom: '155px' }} />
              {
                data.views.map((el, i) => (
                  <div className={`map_text_container map_text_container_${i}`} key={uuidv4()}>
                    <IsVisible>
                      {(isVisible) => {
                        if (isVisible) {
                          changeVisible(i);
                        }
                        return (el.text) ? <div className="text">{el.text}</div> : <div />;
                      }}
                    </IsVisible>
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <p>Proin molestie pulvinar mattis. Integer nisl tortor, varius vitae semper sed, porttitor a tortor. Phasellus venenatis justo justo, eget luctus urna auctor a. Fusce sagittis vel dui nec consequat. Donec vel fringilla urna, vitae iaculis sapien. Mauris aliquam nibh nec vulputate viverra. Sed posuere ac massa in gravida. Fusce consectetur, tellus vitae gravida maximus, augue tellus congue est, et tincidunt nulla nisi sit amet urna. Sed et elementum augue, non pharetra sem. Nunc at purus cursus, hendrerit quam sed, porta dui. Praesent maximus quis lorem ut rutrum. Cras dignissim risus elit, ac interdum sapien feugiat ut.</p>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
