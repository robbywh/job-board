'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Search, Building2, Plus, Zap, ImageIcon, Info } from 'lucide-react';
import { Company } from '@/types/database';
import { processLogoUpload, UploadProgress } from '@/lib/upload';
import { getAllCompaniesClient } from '@/lib/companies';

interface CompanySelectorProps {
  onCompanySelect: (company: Company | null, isNew: boolean, searchTerm: string) => void;
  onLogoSelect: (file: File | null, preview: string, logoUrl?: string) => void;
  onUploadStateChange: (isUploading: boolean) => void;
  disabled?: boolean;
}

export default function CompanySelector({ onCompanySelect, onLogoSelect, onUploadStateChange, disabled }: CompanySelectorProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isNewCompany, setIsNewCompany] = useState(false);
  const [logoPreview, setLogoPreview] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getAllCompaniesClient();
      setCompanies(data);
      setFilteredCompanies(data);
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setShowDropdown(true);
    
    if (term.trim() === '') {
      setFilteredCompanies(companies);
      setSelectedCompany(null);
      setIsNewCompany(false);
      setLogoPreview('');
      setLogoUrl('');
    } else {
      const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCompanies(filtered);
      
      const exactMatch = companies.find(c => 
        c.name.toLowerCase() === term.toLowerCase()
      );
      
      if (exactMatch) {
        setSelectedCompany(exactMatch);
        setIsNewCompany(false);
        if (exactMatch.logo_url) {
          setLogoPreview(exactMatch.logo_url);
          setLogoUrl(exactMatch.logo_url);
        }
      } else {
        setSelectedCompany(null);
        setIsNewCompany(true);
        setLogoPreview('');
        setLogoUrl('');
      }
    }
    
    onCompanySelect(selectedCompany, !selectedCompany && term.trim() !== '', term);
  };

  const handleCompanySelect = (company: Company) => {
    setSearchTerm(company.name);
    setSelectedCompany(company);
    setIsNewCompany(false);
    setShowDropdown(false);
    
    if (company.logo_url) {
      setLogoPreview(company.logo_url);
      setLogoUrl(company.logo_url);
    } else {
      setLogoPreview('');
      setLogoUrl('');
    }
    
    onCompanySelect(company, false, company.name);
  };

  const handleCreateNew = () => {
    setIsNewCompany(true);
    setSelectedCompany(null);
    setShowDropdown(false);
    setLogoPreview('');
    setLogoUrl('');
    onCompanySelect(null, true, searchTerm);
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onUploadStateChange(true);

    const handleProgress = (progress: UploadProgress) => {
      setIsUploading(progress.isUploading);
      if (progress.preview) {
        setLogoPreview(progress.preview);
      }
    };

    const { preview, uploadResult } = await processLogoUpload(file, handleProgress);

    if (uploadResult.success && uploadResult.url) {
      setLogoUrl(uploadResult.url);
      onLogoSelect(file, preview, uploadResult.url);
    } else {
      alert(uploadResult.error || 'Failed to upload logo. Please try again.');
      setLogoPreview('');
      setLogoUrl('');
      onLogoSelect(null, '');
    }

    onUploadStateChange(false);
  };

  return (
    <div className="space-y-4">
      <div className="form-control">
        <div className="mb-2">
          <label className="label-text font-medium">Company <span className="text-error">*</span></label>
        </div>
        <div className="relative" ref={dropdownRef}>
          <input 
            type="text" 
            placeholder="Search companies or type new company name"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="input input-bordered w-full focus:input-primary text-base"
            required
            disabled={disabled}
            name="companyName"
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="w-4 h-4 text-base-content/40" />
          </div>
          
          {showDropdown && (filteredCompanies.length > 0 || searchTerm.trim()) && (
            <div className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-box shadow-xl max-h-44 sm:max-h-48 overflow-y-auto">
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center gap-3 p-3 sm:p-3 hover:bg-base-200 cursor-pointer transition-colors active:bg-base-300"
                  onClick={() => handleCompanySelect(company)}
                >
                  <div className="avatar flex-shrink-0">
                    <div className="w-8 h-8 rounded bg-base-300">
                      {company.logo_url ? (
                        <Image 
                          src={company.logo_url} 
                          alt={`${company.name} logo`} 
                          width={32}
                          height={32}
                          className="object-cover rounded" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-base-content/60">
                          <Building2 className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{company.name}</p>
                  </div>
                </div>
              ))}
              
              {searchTerm.trim() && !companies.find(c => c.name.toLowerCase() === searchTerm.toLowerCase()) && (
                <div
                  className="flex items-center gap-3 p-3 sm:p-3 hover:bg-primary/10 cursor-pointer transition-colors border-t border-base-300 active:bg-primary/20"
                  onClick={handleCreateNew}
                >
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center ak">
                    <Plus className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-primary text-sm truncate">Create &quot;{searchTerm}&quot;</p>
                    <p className="text-xs text-base-content/60">Add as new company</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {isNewCompany && searchTerm && (
          <div className="mt-2">
            <span className="label-text-alt text-info flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Creating new company: &quot;{searchTerm}&quot;
            </span>
          </div>
        )}
      </div>

      <div className="form-control">
        <div className="mb-2">
          <label className="label-text font-medium mr-2">
            Company Logo 
            {(isNewCompany || !selectedCompany?.logo_url) && <span className="text-error">*</span>}
            {selectedCompany?.logo_url && !isNewCompany && <span className="text-base-content/60">(optional)</span>}
          </label>
          <span className="label-text-alt text-base-content/60 text-xs">PNG, JPG, WebP, SVG • Max 2MB</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="avatar self-center sm:self-start">
            <div className="w-16 h-16 rounded-lg bg-base-200 flex items-center justify-center flex-shrink-0">
              {logoPreview ? (
                <Image 
                  src={logoPreview} 
                  alt="Company logo preview" 
                  width={64}
                  height={64}
                  style={{ width: '64px', height: '64px' }}
                  className="object-cover rounded-lg" 
                />
              ) : (
                <ImageIcon className="w-16 h-16 text-base-content/40" />
              )}
            </div>
          </div>
          
          <div className="flex-1 w-full sm:w-auto">
            <input 
              type="file" 
              accept=".png,.jpg,.jpeg,.webp,.svg"
              onChange={handleLogoChange}
              className="file-input file-input-bordered file-input-sm w-full text-sm"
              required={isNewCompany || !selectedCompany?.logo_url}
              disabled={disabled || isUploading}
              name="logo"
            />
            
            {isUploading && (
              <div className="mt-2">
                <div className="alert alert-info py-2 px-3">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span className="text-xs">Uploading logo...</span>
                </div>
              </div>
            )}
            
            {!isNewCompany && selectedCompany && (
              <div className="mt-2">
                <div className="alert alert-info py-2 px-3">
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs">
                    {selectedCompany.logo_url 
                      ? "Upload a new logo to update the company logo (optional)" 
                      : "Upload a logo for this company"
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <input type="hidden" name="selectedCompanyId" value={selectedCompany?.id || ''} />
      <input type="hidden" name="isNewCompany" value={isNewCompany.toString()} />
      <input type="hidden" name="logoUrl" value={logoUrl} />
    </div>
  );
}