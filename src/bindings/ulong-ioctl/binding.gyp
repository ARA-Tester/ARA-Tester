{
    'targets': [
        {
            'target_name': 'ulong_ioctl',
            'sources': [ 'ulong_ioctl.cc' ],
            'include_dirs': [
                '<!(node -e "require(\'nan\')")'
            ]
        }
    ]
}