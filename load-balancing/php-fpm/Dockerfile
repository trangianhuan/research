
FROM laradock/php-fpm:latest-7.4

# always run apt update when start and after add new source list, then clean up at end.
RUN apt-get update -yqq && \
    apt-get install -y apt-utils && \
    pecl channel-update pecl.php.net


COPY ./php7.4.ini /usr/local/etc/php/conf.d
COPY ./xlaravel.pool.conf /usr/local/etc/php-fpm.d/

USER root

# Clean up
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    rm /var/log/lastlog /var/log/faillog

RUN usermod -u 1000 www-data

RUN  echo mkdir -p /usr/share/man/man1mkdir -p /usr/share/man/man1

WORKDIR /var/www

CMD ["php-fpm"]

EXPOSE 9000
