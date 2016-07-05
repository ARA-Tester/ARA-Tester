#include <string>
#include <fstream>
#include <iostream>

using namespace std;

#define _IOCTL_ENUM_JS(name) \
    string str_js = "exports."; \
    str_js += name; \
    str_js += " = {\n" \

#define _IOCTL_ENUM_TS(name) \
    string str_ts = "export enum "; \
    str_ts += name; \
    str_ts += " {\n" \

#define _IOCTL_ENUM_IOCL_JS(ioctl, value) \
    str_js += "\t\""; \
    str_js += ioctl; \
    str_js += "\": "; \
    str_js += to_string(value); \
    str_js += ",\n"; \
    str_js += "\t\""; \
    str_js += to_string(value); \
    str_js += "\": \""; \
    str_js += ioctl; \
    str_js += "\",\n" \

#define _IOCTL_ENUM_IOCL_TS(ioctl, value) \
    str_ts += "\t"; \
    str_ts += ioctl; \
    str_ts += " = "; \
    str_ts += to_string(value); \
    str_ts += ",\n" \

#define IOCTL_ENUM_IOCTL(ioctl, value) \
    _IOCTL_ENUM_IOCL_JS(ioctl, value); \
    _IOCTL_ENUM_IOCL_TS(ioctl, value)

#define _IOCTL_ENUM_EXPORT_SINGLE(name) \
    tmp = str_##name; \
    tmp.pop_back(); \
    tmp.pop_back(); \
    tmp += "\n};\n"; \
    cout << tmp \

#define IOCTL_ENUM_EXPORT() \
    _IOCTL_ENUM_EXPORT_SINGLE(js); \
    _IOCTL_ENUM_EXPORT_SINGLE(ts); \
    return 0; \
} \

#define IOCTL_ENUM(name) \
int main(void) { \
    ofstream out_file; \
    string f_name; \
    string tmp; \
    _IOCTL_ENUM_JS(name); \
    _IOCTL_ENUM_TS(name) \

//