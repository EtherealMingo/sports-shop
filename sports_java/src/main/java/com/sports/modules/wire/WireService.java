// @ai-generated - 全部由 AI 輔助生成
package com.sports.modules.wire;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sports.modules.wire.Wire;

public interface WireService {

    Page<Wire> getWireList(Page<Wire> page, String keyword, String type);

    Wire getWireById(Long id);

    void createWire(Wire wire);

    void updateWire(Wire wire);

    void deleteWire(Long id);
}
